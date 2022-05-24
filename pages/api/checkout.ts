import {
  GetProductBySlugSizeQueryVariables,
  GetProductBySlugSizeQuery,
  GetProductBySlugSizeDocument,
  CreateCartItemDocument,
  CreateCartItemMutation,
  CreateCartItemMutationVariables,
  CreateInitialOrderMutation,
  CreateInitialOrderMutationVariables,
  CreateInitialOrderDocument,
  UpdateTotalOrderMutation,
  UpdateTotalOrderMutationVariables,
  UpdateTotalOrderDocument,
} from './../../generated/graphql';
import { apolloClient, authApolloClient } from './../../graphql/graphqlClient';
import { NextApiHandler } from 'next';
import { Stripe } from 'stripe';

const handler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return res
      .status(500)
      .json({ error: 'Stripe secret key was not provided!' });
  }

  const body = req.body as {
    slug: string;
    count: number;
    size: string;
  }[];

  const products = await Promise.all(
    body.map(async (cartItem) => {
      const response = await apolloClient.query<
        GetProductBySlugSizeQuery,
        GetProductBySlugSizeQueryVariables
      >({
        query: GetProductBySlugSizeDocument,
        variables: {
          slug: cartItem.slug,
          size: [cartItem.size],
        },
      });

      return {
        ...response,
        count: cartItem.count,
        size: cartItem.size,
      };
    })
  );

  const cartValue = products.reduce((sum, val) => {
    return (sum += val.count * val.data.product!.price);
  }, 0);

  let shippingOptions = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 0,
          currency: 'pln',
        },
        display_name: 'Darmowa dostawa',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 2,
          },
          maximum: {
            unit: 'business_day',
            value: 5,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: 2500,
          currency: 'pln',
        },
        display_name: 'Kurier',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 2,
          },
          maximum: {
            unit: 'business_day',
            value: 5,
          },
        },
      },
    },
  ];

  if (cartValue >= 10000) {
    shippingOptions = shippingOptions.slice(0, 1);
  } else {
    shippingOptions = shippingOptions.slice(1);
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2020-08-27' });

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['p24', 'card'],
    success_url: `http://${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${process.env.NEXT_PUBLIC_DOMAIN}/checkout/cancel`,
    shipping_address_collection: {
      allowed_countries: ['PL'],
    },
    shipping_options: shippingOptions.map((el) => {
      return {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: el.shipping_rate_data.fixed_amount.amount,
            currency: 'pln',
          },
          display_name: el.shipping_rate_data.display_name,
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: el.shipping_rate_data.delivery_estimate.minimum.value,
            },
            maximum: {
              unit: 'business_day',
              value: el.shipping_rate_data.delivery_estimate.maximum.value,
            },
          },
        },
      };
    }),
    line_items: products.map((product) => {
      return {
        // adjustable_quantity: {
        //   enabled: true,
        //   minimum: 1,
        //   maximum: 99,
        // },
        price_data: {
          currency: 'PLN',
          unit_amount: product.data.product!.price,

          product_data: {
            name: `${product.data.product!.name} ${
              product.data.product!.productSizeVariants[0].size!.name
            }`,
            images: product.data.product!.images.map((image) => image.url),
            metadata: {
              slug: product.data.product!.slug,
              size: product.size,
            },
          },
        },
        quantity: product.count,
      };
    }),
  });

  //create initial order
  const orderId = await authApolloClient.mutate<
    CreateInitialOrderMutation,
    CreateInitialOrderMutationVariables
  >({
    mutation: CreateInitialOrderDocument,
  });

  //create cart items
  const cartItems = await Promise.all(
    products.map(async (product) => {
      const response = await authApolloClient.mutate<
        CreateCartItemMutation,
        CreateCartItemMutationVariables
      >({
        mutation: CreateCartItemDocument,
        variables: {
          amount: product.count,
          size: product.size,
          product: product.data.product!.id,
          order: orderId.data!.createOrder!.id,
          price: product.data.product!.price,
        },
      });

      return {
        ...response.data?.createCartItem,
      };
    })
  );

  //update total value of cart
  const updatedOrder = await authApolloClient.mutate<
    UpdateTotalOrderMutation,
    UpdateTotalOrderMutationVariables
  >({
    mutation: UpdateTotalOrderDocument,
    variables: {
      id: orderId.data!.createOrder!.id,
      total: cartValue,
    },
  });

  res
    .status(201)
    .json({ session: stripeSession, orderId: orderId.data!.createOrder!.id });
};

export default handler;

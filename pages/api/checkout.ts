import {
  GetProductBySlugQuery,
  GetProductBySlugDocument,
  GetProductBySlugQueryVariables,
} from './../../generated/graphql';
import { apolloClient } from './../../graphql/graphqlClient';
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
  }[];

  const products = await Promise.all(
    body.map(async (cartItem) => {
      const response = await apolloClient.query<
        GetProductBySlugQuery,
        GetProductBySlugQueryVariables
      >({
        query: GetProductBySlugDocument,
        variables: {
          slug: cartItem.slug,
        },
      });

      return {
        ...response,
        count: cartItem.count,
      };
    })
  );

  const stripe = new Stripe(stripeKey, { apiVersion: '2020-08-27' });

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['p24', 'card'],
    success_url:
      'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout/cancel',
    line_items: products.map((product) => {
      return {
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 99,
        },
        price_data: {
          currency: 'PLN',
          unit_amount: product.data.product!.price,
          product_data: {
            name: product.data.product!.name,
            images: product.data.product!.images.map((image) => image.url),
            metadata: {
              slug: product.data.product!.slug,
            },
          },
        },
        quantity: product.count,
      };
    }),
  });

  //crate order in graphcms TODO

  res.status(201).json({ session: stripeSession });
};

export default handler;

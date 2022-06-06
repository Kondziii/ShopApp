import {
  UpdateOrderStripeMutation,
  UpdateOrderStripeMutationVariables,
  UpdateOrderStripeDocument,
  GetOrderCartItemsByIdQuery,
  GetOrderCartItemsByIdQueryVariables,
  GetOrderCartItemsByIdDocument,
  UpdateProductAfterOrderMutation,
  UpdateProductAfterOrderMutationVariables,
  UpdateProductAfterOrderDocument,
} from './../../generated/graphql';
import { authApolloClient } from './../../graphql/graphqlClient';
import { NextApiHandler } from 'next';

interface PaymentSuccessHandlerType {
  orderId: string;
  stripeId: string;
  email: string;
}

const handler: NextApiHandler = async (req, res) => {
  const { orderId, stripeId, email } = req.body as PaymentSuccessHandlerType;

  if (!orderId || !stripeId) {
    return res.status(400).json({});
  }

  const emailData = email === '' ? 'anonim@test.pl' : email;

  const response = await authApolloClient.mutate<
    UpdateOrderStripeMutation,
    UpdateOrderStripeMutationVariables
  >({
    mutation: UpdateOrderStripeDocument,
    variables: {
      orderId: orderId,
      stripeId: stripeId,
      email: emailData,
    },
  });

  const cartItems = await authApolloClient.query<
    GetOrderCartItemsByIdQuery,
    GetOrderCartItemsByIdQueryVariables
  >({
    query: GetOrderCartItemsByIdDocument,
    variables: {
      id: orderId,
      first: 1000,
    },
  });

  const updatedProducts = await Promise.all(
    cartItems.data.order!.cartItems.map(async (item) => {
      const response = await authApolloClient.mutate<
        UpdateProductAfterOrderMutation,
        UpdateProductAfterOrderMutationVariables
      >({
        mutation: UpdateProductAfterOrderDocument,
        variables: {
          product: item.product!.id,
          totalAmount:
            item.product!.productSizeVariants.filter(
              (el) => el!.size?.name === item.size
            )[0].amount - item.amount,
          sizeId: item.product!.productSizeVariants.filter(
            (el) => el.size?.name === item.size
          )[0].id,
        },
      });

      return response.data?.publishProduct;
    })
  );

  return res.status(201).json({ data: response.data });
};

export default handler;

import {
  UpdateOrderStripeMutation,
  UpdateOrderStripeMutationVariables,
  UpdateOrderStripeDocument,
} from './../../generated/graphql';
import { authApolloClient, apolloClient } from './../../graphql/graphqlClient';
import { NextApiHandler } from 'next';

interface PaymentSuccessHandlerType {
  orderId: string;
  stripeId: string;
}

const handler: NextApiHandler = async (req, res) => {
  const { orderId, stripeId } = req.body as PaymentSuccessHandlerType;

  if (!orderId || !stripeId) {
    return res.status(400).json({});
  }

  const response = await authApolloClient.mutate<
    UpdateOrderStripeMutation,
    UpdateOrderStripeMutationVariables
  >({
    mutation: UpdateOrderStripeDocument,
    variables: {
      orderId: orderId,
      stripeId: stripeId,
    },
  });

  return res.status(201).json({ data: response.data });
};

export default handler;

import {
  UpdateOrderStageMutation,
  UpdateOrderStageDocument,
  OrderStage,
} from './../../generated/graphql';
import { authApolloClient } from './../../graphql/graphqlClient';
import { NextApiHandler } from 'next';
import { UpdateOrderStageMutationVariables } from '../../generated/graphql';

interface CancelPaymentHandlerProps {
  email: string;
  orderId: string;
}

const handler: NextApiHandler = async (req, res) => {
  const { email, orderId } = req.body as CancelPaymentHandlerProps;

  if (!email || !orderId) {
    return res.status(400).json({});
  }

  const response = await authApolloClient.mutate<
    UpdateOrderStageMutation,
    UpdateOrderStageMutationVariables
  >({
    mutation: UpdateOrderStageDocument,
    variables: {
      email: email,
      orderId: orderId,
      stage: OrderStage.Anulowano,
    },
  });

  return res.status(201).json({});
};

export default handler;

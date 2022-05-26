import {
  UpdateOrderByStripeIdMutation,
  UpdateOrderByStripeIdMutationVariables,
  UpdateOrderByStripeIdDocument,
  OrderStage,
} from './../../generated/graphql';
import { authApolloClient } from './../../graphql/graphqlClient';
import { StripeWebhookEvents } from './../../stripeEvent';
import { NextApiHandler } from 'next';

const StripeWebHook: NextApiHandler = async (req, res) => {
  //TODO check signing in
  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case 'checkout.session.completed': {
      console.log(event.data.object);
      const response = await authApolloClient.mutate<
        UpdateOrderByStripeIdMutation,
        UpdateOrderByStripeIdMutationVariables
      >({
        mutation: UpdateOrderByStripeIdDocument,
        variables: {
          stripeId:
            'cs_test_a1cZbgvIOU2mr3T8O9U0NILbGbSAwv5mi2RelMWLmCr4IadDHvta134Igz',
          stage: OrderStage.Zatwierdzono,
        },
      });
      break;
    }
  }

  res.status(204).end();
};

export default StripeWebHook;

import { StripeWebhookEvents } from './../../stripeEvent';
import { NextApiHandler } from 'next';

const StripeWebHook: NextApiHandler = (req, res) => {
  //TODO check signing in
  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case 'checkout.session.completed': {
      // TODO update order status,
      console.log(event.data.object);
      break;
    }
  }

  res.status(204).end();
};

export default StripeWebHook;

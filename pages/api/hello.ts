// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST').status(405).json({});
    return;
  }

  const MAILER_API_KEY = process.env.MAILER_API_KEY;
  const MAILER_GROUP_KEY = process.env.MAILER_GROUP_KEY;

  if (!MAILER_API_KEY || !MAILER_GROUP_KEY) {
    return res.status(500).json({ error: 'Environment variables missing.' });
  }

  const email = req.body.email;

  if (typeof email !== 'string') {
    res.status(400).json({});
    return;
  }

  const mailerResponse = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILER_GROUP_KEY}/subscribers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILER_API_KEY,
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  console.log(mailerResponse);

  if (!mailerResponse.ok) {
    res
      .status(500)
      .json({ error: 'Pojawił się problem przy zapisie do newslettera.' });
    return;
  }

  res.status(201).json({});
};

export default handler;

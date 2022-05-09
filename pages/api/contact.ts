import { ContactForm } from './../contact';
import { NextApiHandler } from 'next';
import nodemailer from 'nodemailer';

const handler: NextApiHandler = async (req, res) => {
  const { email, title, text } = req.body as ContactForm;

  if (!email || !title || !text) {
    return res.status(400).json({});
  }

  const transporter = nodemailer.createTransport({
    host: process.env.TEST_EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.TEST_EMAIL_USER,
      pass: process.env.TEST_EMAIL_PASSWORD,
    },
  });
  try {
    await nodemailer.createTestAccount();

    await transporter.sendMail({
      from: email,
      to: process.env.SHOP_EMAIL,
      subject: title,
      text: text,
    });
  } catch (error) {
    return res.status(500).json({});
  }
  res.status(201).json({});
};

export default handler;

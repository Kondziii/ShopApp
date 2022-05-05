import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  CreateAccountDocument,
} from './../../generated/graphql';
import { authApolloClient } from './../../graphql/graphqlClient';
import { SignUpForm } from './../signup';
import { NextApiHandler } from 'next';
import * as bcrypt from 'bcrypt';

type SignUpHandler = Pick<SignUpForm, 'email' | 'password'>;

const handler: NextApiHandler = async (req, res) => {
  const { email, password }: SignUpHandler = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email or password is missing!' });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await authApolloClient.mutate<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >({
    mutation: CreateAccountDocument,
    variables: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ userId: user.data?.createAccount?.id });
};

export default handler;

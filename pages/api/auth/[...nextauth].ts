import {
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
  GetAccountByEmailDocument,
} from './../../../generated/graphql';
import { apolloClient } from './../../../graphql/graphqlClient';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await apolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: {
            email: credentials.email,
          },
        });

        if (!user.data.account?.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.data.account.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.data.account.id,
          email: user.data.account.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      session.user = token.user as User;
      return session;
    },
  },
});

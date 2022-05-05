import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { CartContextProvider } from '../components/cart/CartContext';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/graphqlClient';
import { SessionProvider } from 'next-auth/react';

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CartContextProvider>
          <Layout>
            <QueryClientProvider client={client}>
              <Component {...pageProps} />
              {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
          </Layout>
        </CartContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;

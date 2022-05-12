import '../styles/globals.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { CartContextProvider } from '../components/cart/CartContext';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql/graphqlClient';
import { SessionProvider } from 'next-auth/react';
import { FilterContextProvider } from '../components/FilterContext';

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <FilterContextProvider>
          <CartContextProvider>
            <Layout>
              <QueryClientProvider client={client}>
                <Component {...pageProps} />
                {/* <ReactQueryDevtools /> */}
              </QueryClientProvider>
            </Layout>
          </CartContextProvider>
        </FilterContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;

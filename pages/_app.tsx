import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CartContextProvider } from '../components/cart/CartContext';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <QueryClientProvider client={client}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;

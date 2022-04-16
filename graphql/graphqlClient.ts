import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1hw863b5k0i01xi9z08cczv/master',
  cache: new InMemoryCache(),
});

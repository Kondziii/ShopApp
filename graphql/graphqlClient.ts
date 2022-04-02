import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1hpch2b5dpw01xf2n05b4kd/master',
  cache: new InMemoryCache(),
});

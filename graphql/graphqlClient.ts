import { Account, Product } from './../generated/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1hw863b5k0i01xi9z08cczv/master',
  cache: new InMemoryCache({
    addTypename: true,
    typePolicies: {
      Product: {
        fields: {
          reviews: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export const authApolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/cl1hw863b5k0i01xi9z08cczv/master',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

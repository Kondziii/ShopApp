import { InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import { AppInfoStructure } from '../components/containers/AppInfoStructure';
import {
  GetAboutLinkDocument,
  GetAboutLinkQuery,
  GetAboutLinkQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const paymentsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AppInfoStructure data={data} />;
};

export default paymentsPage;

export const getStaticProps = async () => {
  const data = await apolloClient.query<
    GetAboutLinkQuery,
    GetAboutLinkQueryVariables
  >({
    query: GetAboutLinkDocument,
    variables: {
      title: 'Metody płatności',
    },
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.data.link,
        description: await serialize(data.data.link!.description),
      },
    },
  };
};

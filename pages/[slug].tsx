import { InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import React from 'react';
import { AppInfoStructure } from '../components/containers/AppInfoStructure';
import {
  GetInfoSectionBySlugDocument,
  GetInfoSectionBySlugQuery,
  GetInfoSectionBySlugQueryVariables,
  GetInfoSectionsDocument,
  GetInfoSectionsQuery,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';
import { InferGetStaticPaths } from './offer/products/[slug]';

const InfoPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AppInfoStructure data={data} />;
};

export default InfoPage;

export const getStaticPaths = async () => {
  const data = await apolloClient.query<GetInfoSectionsQuery>({
    query: GetInfoSectionsDocument,
  });

  return {
    paths: data.data.links.map((item) => ({
      params: {
        slug: item.slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const data = await apolloClient.query<
    GetInfoSectionBySlugQuery,
    GetInfoSectionBySlugQueryVariables
  >({
    query: GetInfoSectionBySlugDocument,
    variables: {
      slug: params.slug,
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

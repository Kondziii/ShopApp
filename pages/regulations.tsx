import { InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import React from 'react';
import CustomMarkdown from '../components/CustomMarkdown';
import {
  GetAboutLinkDocument,
  GetAboutLinkQuery,
  GetAboutLinkQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const regulationsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <NextSeo
        title='Stoopki | Regulamin'
        description='Regulamin sklepu z bielizną i skarpetkami Stoopki.'
      />
      <h1 className='my-6 text-3xl font-bold text-center'>Regulamin</h1>
      <hr />
      <article className='prose lg:prose-md mx-auto p-8 max-w-[90%] sm:max-w-[70%] '>
        <CustomMarkdown>{data.description}</CustomMarkdown>
      </article>
    </div>
  );
};

export default regulationsPage;

export const getStaticProps = async () => {
  const data = await apolloClient.query<
    GetAboutLinkQuery,
    GetAboutLinkQueryVariables
  >({
    query: GetAboutLinkDocument,
    variables: {
      title: 'Regulamin',
    },
  });

  return {
    props: {
      data: {
        ...data.data.link,
        description: await serialize(data.data.link!.description),
      },
    },
  };
};

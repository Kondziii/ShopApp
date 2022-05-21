import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import React from 'react';
import CustomMarkdown from '../../components/CustomMarkdown';
import {
  GetNewsSectionBySlugDocument,
  GetNewsSectionBySlugQuery,
  GetNewsSectionBySlugQueryVariables,
  GetNewsSectionDocument,
  GetNewsSectionQuery,
  GetNewsSectionQueryVariables,
} from '../../generated/graphql';
import { apolloClient } from '../../graphql/graphqlClient';
import { InferGetStaticPaths } from '../offer/products/[slug]';

const NewsItemPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!data) {
    router.replace('/');
    return null;
  }

  return (
    <section className='container my-4 bg-white'>
      <h1 className='mb-4 text-xl font-bold text-center sm:text-2xl'>
        {data.title}
      </h1>
      <hr />
      <article className='prose lg:prose-md mx-auto p-8 max-w-[90%] sm:max-w-[70%] '>
        <CustomMarkdown>{data.longDescription}</CustomMarkdown>
      </article>
    </section>
  );
};

export default NewsItemPage;

export const getStaticPaths = async () => {
  const newsSections = await apolloClient.query<
    GetNewsSectionQuery,
    GetNewsSectionQueryVariables
  >({
    query: GetNewsSectionDocument,
  });

  return {
    paths: newsSections.data.newsSections.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const article = await apolloClient.query<
    GetNewsSectionBySlugQuery,
    GetNewsSectionBySlugQueryVariables
  >({
    query: GetNewsSectionBySlugDocument,
    variables: {
      slug: params!.slug,
    },
  });

  return {
    props: {
      data: {
        ...article.data.newsSection,
        longDescription: await serialize(
          article.data.newsSection!.longDescription
        ),
      },
    },
  };
};

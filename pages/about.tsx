import { InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import CustomMarkdown from '../components/CustomMarkdown';
import {
  GetAboutLinkDocument,
  GetAboutLinkQuery,
  GetAboutLinkQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const AboutPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <NextSeo
        title='Stoopki | O nas'
        description='Sekcja o nas sklepu z bielizną i skarpetkami Stoopki.'
      />
      <h1 className='my-6 text-3xl font-bold text-center'>O nas</h1>
      <hr />
      <article className='prose lg:prose-md mx-auto p-8 max-w-[90%] sm:max-w-[70%] '>
        <CustomMarkdown>{data.description}</CustomMarkdown>
      </article>
    </div>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const data = await apolloClient.query<
    GetAboutLinkQuery,
    GetAboutLinkQueryVariables
  >({
    query: GetAboutLinkDocument,
    variables: {
      title: 'O nas',
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

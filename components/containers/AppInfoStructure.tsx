import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import React from 'react';
import CustomMarkdown from '../CustomMarkdown';

interface AppInfoStructureProps {
  data: {
    title: String;
    description: MDXRemoteSerializeResult<Record<string, unknown>>;
  };
}

export const AppInfoStructure = ({ data }: AppInfoStructureProps) => {
  return (
    <div>
      <NextSeo
        title={`Stoopki | ${data.title}`}
        description={`${data.title} sklepu z bielizną i skarpetkami Stoopki.`}
      />
      <h1 className='my-6 text-3xl font-bold text-center'>{data.title}</h1>
      <hr />
      <article className='prose lg:prose-md mx-auto p-8 max-w-[90%] sm:max-w-[70%] '>
        <CustomMarkdown>{data.description}</CustomMarkdown>
      </article>
    </div>
  );
};

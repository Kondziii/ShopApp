import React from 'react';
import { NewsSectionFragmentFragment } from '../generated/graphql';
import { NewsSectionItem } from './NewsSectionItem';
import { SectionTitle } from './SectionTitle';

interface NewsSectionProps {
  news: Array<NewsSectionFragmentFragment>;
}

export const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <section className='my-4'>
      <SectionTitle title='Aktualności' />
      <hr />
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        {news.map((section) => {
          return <NewsSectionItem key={section.id} item={section} />;
        })}
      </div>
    </section>
  );
};

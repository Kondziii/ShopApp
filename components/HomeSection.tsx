import React from 'react';
import { SocksSectionFragment } from '../generated/graphql';
import { SectionItem } from './SectionItem';
import { SectionTitle } from './SectionTitle';

interface HomeSectionProps {
  title: string;
  items: Array<SocksSectionFragment>;
  queryName: string;
}

export const HomeSection = ({ title, items, queryName }: HomeSectionProps) => {
  return (
    <section>
      <SectionTitle title={title} />
      <hr />
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4'>
        {items.map((item) => {
          return (
            <SectionItem queryName={queryName} key={item.title} item={item} />
          );
        })}
      </div>
    </section>
  );
};

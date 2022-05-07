import React from 'react';
import { SocksSectionFragment } from '../generated/graphql';
import { SectionItem } from './SectionItem';
import { SectionTitle } from './SectionTitle';

interface HomeSectionProps {
  title: string;
  items: Array<SocksSectionFragment>;
}

export const HomeSection = ({ title, items }: HomeSectionProps) => {
  return (
    <section>
      <SectionTitle title={title} />
      <hr />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {items.map((item) => {
          return <SectionItem key={item.title} item={item} />;
        })}
      </div>
    </section>
  );
};

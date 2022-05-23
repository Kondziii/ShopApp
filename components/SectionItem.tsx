import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SocksSectionFragment } from '../generated/graphql';
import { useFilterState } from './FilterContext';

interface SectionItemProps {
  item: SocksSectionFragment;
  queryName: string;
}
export const SectionItem = ({ item, queryName }: SectionItemProps) => {
  const filterState = useFilterState();

  const handleFilter = () => {
    filterState.setCategoryFilterOptions((prev) => {
      return prev.map((category) => {
        if (category.title === item.category?.name)
          return {
            ...category,
            checked: true,
          };
        return category;
      });
    });
  };

  return (
    <Link
      href={`/offer/1?${queryName}=${item.category?.name}&from=section`}
      passHref
    >
      <article
        onClick={handleFilter}
        className='relative w-3/4 mx-auto my-4 bg-gray-100 cursor-pointer group sm:w-full'
      >
        <span className='absolute bottom-0 left-0 z-50 flex items-center justify-center w-full text-white transition-all duration-300 bg-black group-hover:h-1/4 h-1/5 bg-opacity-40'>
          {item.category?.displayName}
        </span>
        <Image
          src={item.image.url}
          alt={item.title}
          layout='responsive'
          width={4}
          height={4}
        />
      </article>
    </Link>
  );
};

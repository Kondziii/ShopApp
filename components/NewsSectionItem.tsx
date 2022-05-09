import React from 'react';
import { NewsSectionFragmentFragment } from '../generated/graphql';
import Image from 'next/image';
import Link from 'next/link';

interface NewsSectionItemProps {
  item: NewsSectionFragmentFragment;
}

export const NewsSectionItem = ({ item }: NewsSectionItemProps) => {
  return (
    <article className='m-2 bg-white p-6 shadow-md rounded'>
      <h3 className='text-md uppercase tracking-wide mb-4 font-semibold'>
        {item.title}
      </h3>
      <div className='block md:flex sm:w-full items-center justify-center gap-2'>
        <div className='w-full md:w-3/4 sm:mb-2'>
          <Image
            src={item.image.url}
            alt={item.title}
            layout='responsive'
            width={2}
            height={1}
            objectFit='cover'
          />
        </div>
        <p className='w-full md:w-3/4 text-justify font-light'>
          {item.shortDescription}
        </p>
      </div>
      <div className='flex justify-end mt-4'>
        <Link href={`news/${item.slug}`}>
          <a className='px-4 py-2 text-slate-700 border border-slate-700 rounded-full transition duration-300 hover:text-white hover:bg-slate-700'>
            Czytaj więcej
          </a>
        </Link>
      </div>
    </article>
  );
};

import React from 'react';
import { NewsSectionFragmentFragment } from '../generated/graphql';
import Image from 'next/image';
import Link from 'next/link';

interface NewsSectionItemProps {
  item: NewsSectionFragmentFragment;
}

export const NewsSectionItem = ({ item }: NewsSectionItemProps) => {
  return (
    <article className='p-6 my-8 bg-white rounded shadow-md'>
      <h3 className='mb-4 font-semibold tracking-wide uppercase text-md'>
        {item.title}
      </h3>
      <div className='items-center justify-center block gap-2 md:flex sm:w-full'>
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
        <p className='w-full font-light text-justify md:w-3/4'>
          {item.shortDescription}
        </p>
      </div>
      <div className='flex justify-end mt-4'>
        <Link href={`news/${item.slug}`}>
          <a className='px-4 py-2 transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:text-white hover:bg-slate-700'>
            Czytaj więcej
          </a>
        </Link>
      </div>
    </article>
  );
};

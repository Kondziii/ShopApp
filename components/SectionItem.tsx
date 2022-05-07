import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SocksSectionFragment } from '../generated/graphql';

interface SectionItemProps {
  item: SocksSectionFragment;
}
export const SectionItem = ({ item }: SectionItemProps) => {
  return (
    <Link href='/offer' passHref>
      <article className='relative group my-4 cursor-pointer w-3/4 mx-auto sm:w-full bg-gray-100'>
        <span className='group-hover:h-1/4 transition-all duration-300 absolute bottom-0 left-0 w-full h-1/5 bg-black flex items-center z-50 justify-center bg-opacity-40 text-white'>
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

import React from 'react';
import Link from 'next/link';

interface EmptyListProps {
  title: string;
  description: string;
  linkCaption: string;
  to: string | object;
}

export const EmptyList = ({
  title,
  description,
  linkCaption,
  to,
}: EmptyListProps) => {
  return (
    <div className='p-10 mx-auto text-center bg-white rounded shadow-sm sm:p-12 w-fit'>
      <h1 className='mb-4 text-xl sm:text-2xl'>{title}</h1>
      <p className='mb-2 font-light text-gray-600'>{description}</p>
      <Link href={to}>
        <a className='mb-2 text-lg text-yellow-500  hover:text-yellow-600'>
          {linkCaption}
        </a>
      </Link>
    </div>
  );
};

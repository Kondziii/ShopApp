import React from 'react';
import Link from 'next/link';

export const EmptyCart = () => {
  return (
    <div className='p-10 mx-auto text-center bg-white rounded shadow-sm sm:p-12 w-fit'>
      <h1 className='mb-4 text-xl sm:text-2xl'>Your cart is empty so far.</h1>
      <p className='font-light text-gray-600'>
        Review our offer and choose something for you.
      </p>
      <Link href={'/offer'}>
        <a className='mb-2 text-lg text-yellow-500 hover:text-yellow-600'>
          Go to offer
        </a>
      </Link>
    </div>
  );
};

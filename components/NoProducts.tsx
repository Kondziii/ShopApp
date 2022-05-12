import React from 'react';

interface NoProductsProps {
  message: string;
}

export const NoProducts = ({ message }: NoProductsProps) => {
  return (
    <div className='relative h-full col-span-9 bg-white rounded shadow'>
      <div className='absolute p-10 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
        <p className='text-lg text-center'>{message}</p>
      </div>
    </div>
  );
};

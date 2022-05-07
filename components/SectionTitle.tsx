import React from 'react';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div>
      <h2 className='text-3xl my-4 flex items-center tracking-wide font-bold before:inline-block before:w-16 before:mr-1 before:mt-1 before:h-1  before:bg-gray-400'>
        {title}
      </h2>
    </div>
  );
};

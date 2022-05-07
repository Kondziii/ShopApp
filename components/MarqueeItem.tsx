import React from 'react';
import Image from 'next/image';

interface MarqueeItemProps {
  title: string;
  image: string;
}

export const MarqueeItem = ({ title, image }: MarqueeItemProps) => {
  return (
    <div className='flex gap-x-4 mx-12'>
      <Image src={image} alt={title} width={32} height={32} />
      <h3 className='max-w-[10rem]'>{title}</h3>
    </div>
  );
};

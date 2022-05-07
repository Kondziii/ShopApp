import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = (props: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link href='/' passHref>
      <div className='h-12 w-32 sm:w-40'>
        <Image
          className='cursor-pointer'
          src='/Logo.png'
          alt='Stoopki logo'
          width={8}
          height={3}
          layout='responsive'
          objectFit='contain'
        />
      </div>
    </Link>
  );
};

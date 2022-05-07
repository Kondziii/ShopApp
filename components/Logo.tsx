import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Logo = (props: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link href='/' passHref>
      <Image
        className='cursor-pointer'
        src='/Logo.png'
        alt='Stoopki logo'
        width={180}
        height={50}
      />
    </Link>
  );
};

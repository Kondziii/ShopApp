import Link from 'next/link';
import React from 'react';

export const Logo = (props: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link href='/'>
      <a
        className={`text-3xl capitalize sm:text-4xl font-logo ${props.className}`}
      >
        ShopApp
      </a>
    </Link>
  );
};

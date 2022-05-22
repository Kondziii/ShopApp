import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface ProductDetailsNavProps {
  slug: string;
}

export const ProductDetailsNav = ({ slug }: ProductDetailsNavProps) => {
  const router = useRouter();

  console.log(router);

  const isActive = (v: string) => {
    return router.query.v === v;
  };

  return (
    <nav className='mb-6'>
      <ul className='flex gap-3'>
        <li>
          <Link
            href={{
              pathname: `/offer/products/${slug}`,
              query: { v: 'Description' },
            }}
            shallow
            scroll={false}
          >
            <a
              className={`px-4 py-2 transition duration-300 rounded-full ${
                isActive('Description')
                  ? 'bg-slate-700 text-white'
                  : 'bg-gray-200'
              } hover:bg-gray-300 `}
            >
              Opis produktu
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: `/offer/products/${slug}`,
              query: { v: 'Reviews' },
            }}
            shallow
            scroll={false}
          >
            <a
              className={`px-4 py-2 transition duration-300 rounded-full ${
                isActive('Reviews') ? 'bg-slate-700 text-white' : 'bg-gray-200'
              } hover:bg-gray-300 `}
            >
              Opinie klientów
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

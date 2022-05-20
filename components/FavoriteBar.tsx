import { HeartIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { useUserState } from './UserContext';

export const FavoriteBar = () => {
  const userState = useUserState();

  return (
    <Link href={'/favorite'}>
      <a className='relative'>
        {userState.favorites.length !== 0 && (
          <span className='absolute flex items-center justify-center w-5 h-5 text-xs text-center text-white bg-yellow-500 rounded-full -right-2 -top-2 '>
            {userState.favorites.length}
          </span>
        )}
        <HeartIcon className='text-gray-600 h-7' />
      </a>
    </Link>
  );
};

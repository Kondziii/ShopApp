import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useUserState } from './UserContext';

interface FavouriteBtnProps {
  itemId: string;
}

export const FavouriteBtn = ({ itemId }: FavouriteBtnProps) => {
  const { data } = useSession();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const userState = useUserState();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    if (!data) {
      return;
    }
    userState.addToFavorite(itemId);
  };

  const isFavorite = (id: string) => {
    return userState.favorites.find((el) => el === id);
  };

  return (
    <>
      <button
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onClick={handleClick}
        key={isFavorite(itemId)}
      >
        {isFavorite(itemId) ? (
          <HeartIcon className='text-slate-700 h-6 absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition duration-300 ' />
        ) : (
          <HeartIconOutline className='h-6 text-slate-700 absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition duration-300 ' />
        )}
      </button>
    </>
  );
};

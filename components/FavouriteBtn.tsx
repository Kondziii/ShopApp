import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useUserState } from './UserContext';
import Tooltip from 'rc-tooltip';

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
    return userState.favorites.find((el) => el.id === id);
  };

  return (
    <button
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={handleClick}
      className='absolute top-5 right-5 '
    >
      <div className='relative'>
        {isMouseOver && (
          <span className='absolute px-4 py-1 text-xs rounded-full shadow opacity-0 animate-fade-in -right-8 bg-gray-50 w-fit -top-10'>
            {!isFavorite(itemId) ? 'Dodaj do ulubionych' : 'Usuń z ulubionych'}
          </span>
        )}

        {isFavorite(itemId) ? (
          <HeartIcon
            aria-describedby={`tip${itemId}`}
            className='h-6 transition duration-300 opacity-0 text-slate-700 group-hover:opacity-100 '
          />
        ) : (
          <HeartIconOutline
            aria-describedby={`tip${itemId}`}
            className='h-6 transition duration-300 opacity-0 text-slate-700 group-hover:opacity-100'
          />
        )}
      </div>
    </button>
  );
};

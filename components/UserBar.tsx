import { UserIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import React from 'react';

export const UserBar = () => {
  const session = useSession();

  return (
    <div className='relative'>
      {session.status === 'authenticated' && (
        <span className='bg-green-500 absolute h-3 w-3 rounded-full bottom-0 right-0'></span>
      )}
      <UserIcon className='text-gray-600 h-8' />
    </div>
  );
};

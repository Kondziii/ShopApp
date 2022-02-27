import React from 'react';
import { ActiveLink } from './ActiveLink';

const navOptions = [
  { title: 'Home', path: '/' },
  { title: 'Users', path: '/users' },
  { title: 'About', path: '/about' },
];

export const Navigation = React.forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <ul
      ref={ref}
      {...props}
      style={{ height: 0 }}
      className='flex-none mt-0 overflow-hidden transition-all duration-500 ease-linear divide-y-2 sm:!h-fit sm:flex sm:divide-y-0 sm:mt-0 sm:space-x-8'
    >
      {navOptions.map((option) => (
        <li key={option.path} className='relative '>
          <ActiveLink href={option.path} activeClassName='text-yellow-400 '>
            <a className='block w-full h-full px-4 py-2 hover:bg-yellow-50 sm:hover:bg-white sm:px-0 sm:after:absolute sm:after:h-1 sm:after:w-full sm:after:scale-x-0 sm:after:bottom-0 sm:after:left-0 sm:after:bg-yellow-400 sm:hover:after:scale-x-100 after:transition after:duration-300'>
              {option.title}
            </a>
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
});

Navigation.displayName = 'Navigation';

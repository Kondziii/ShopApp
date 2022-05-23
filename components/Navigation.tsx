import React from 'react';
import { ActiveLink } from './ActiveLink';

const navOptions = [
  { title: 'Strona główna', path: '/' },
  // { title: 'Products', path: '/products', exact: false },
  { title: 'Oferta', path: '/offer', exact: false },
  { title: 'O nas', path: '/about' },
  { title: 'Kontakt', path: '/contact' },
  // { title: 'Pagination1', path: '/pagination1', exact: false },
  // { title: 'Pagination2', path: '/pagination2', exact: false },
];

export const Navigation = React.forwardRef<HTMLUListElement>((props, ref) => {
  return (
    <ul
      ref={ref}
      {...props}
      style={{ height: 0 }}
      className=' min-w-full md:min-w-fit mt-2 overflow-hidden md:overflow-visible  transition-all duration-500 ease-linear divide-y-2 md:!h-fit md:flex md:divide-y-0 md:mt-0 md:space-x-8'
    >
      {navOptions.map((option) => (
        <li key={option.path} className='relative '>
          <ActiveLink
            href={option.path}
            activeClassName='!text-yellow-400'
            exact={option.exact}
          >
            <a className='block w-full h-full px-4 py-2 font-normal text-gray-800 sm:text-md hover:bg-yellow-50 md:hover:bg-white md:px-0 md:after:absolute md:after:h-1 md:after:w-full md:after:scale-x-0 md:after:bottom-0 md:after:left-0 md:after:bg-yellow-400 md:hover:after:scale-x-100 after:transition after:duration-300'>
              {option.title}
            </a>
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
});

Navigation.displayName = 'Navigation';

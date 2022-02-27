import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export const Header = () => {
  const nav = useRef<HTMLUListElement>(null);

  const handleToggleMenu = () => {
    if (nav.current && nav.current.style.height === '0px') {
      nav.current.style.height = nav.current.scrollHeight + 'px';
      nav.current.classList.add('mt-7');
    } else if (nav.current) {
      nav.current.style.height = '0';
      nav.current.classList.remove('mt-7');
    }
  };

  return (
    <header className='sticky top-0 px-8 py-5 text-sm font-semibold text-gray-500 uppercase bg-white shadow-md sm:flex sm:items-center'>
      <div className='flex'>
        <button onClick={handleToggleMenu}>
          <FontAwesomeIcon
            className='text-2xl transition duration-300 hover:text-gray-800 sm:hidden'
            icon={faBars}
          />
        </button>
        <Logo className='mx-auto text-center sm:mx-0 sm:mr-10 md:mr-20'></Logo>
      </div>

      <Navigation ref={nav}></Navigation>
    </header>
  );
};

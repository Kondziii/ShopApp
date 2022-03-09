import { useRef } from 'react';
import { Logo } from './Logo';
import { MenuButton } from './MenuButton';
import { Navigation } from './Navigation';

export const Header = () => {
  const nav = useRef<HTMLUListElement>(null);

  const handleToggleMenu = () => {
    if (nav.current && nav.current.style.height === '0px') {
      nav.current.classList.add('mt-8');
      nav.current.style.height = nav.current.scrollHeight + 'px';
    } else if (nav.current) {
      nav.current.classList.remove('mt-8');
      nav.current.style.height = '0';
    }
  };

  return (
    <header className='sticky top-0 z-50 px-8 py-5 text-sm font-semibold text-gray-500 uppercase bg-white shadow-md sm:flex sm:items-center'>
      <div className='flex'>
        <MenuButton onClick={handleToggleMenu} />
        <Logo className='mx-auto text-center sm:mx-0 sm:mr-10 md:mr-20'></Logo>
      </div>
      <Navigation ref={nav}></Navigation>
    </header>
  );
};

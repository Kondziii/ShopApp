import { useRef } from 'react';
import { CartBar } from './cart/CartBar';
import { Logo } from './Logo';
import { MenuButton } from './MenuButton';
import { Navigation } from './Navigation';

export const Header = () => {
  const nav = useRef<HTMLUListElement>(null);

  const handleToggleMenu = () => {
    if (nav.current && nav.current.style.height === '0px') {
      nav.current.style.height = nav.current.scrollHeight + 'px';
    } else if (nav.current) {
      nav.current.style.height = '0';
    }
  };

  return (
    <header className='sticky top-0 z-50 px-8 py-5 text-sm font-semibold text-gray-500 uppercase bg-white shadow-md sm:flex sm:items-center'>
      <div className='container flex flex-wrap items-center justify-between mx-auto sm:flex-nowrap max-w-7xl'>
        <MenuButton onClick={handleToggleMenu} />
        <Logo></Logo>

        <CartBar />
        <Navigation ref={nav}></Navigation>
      </div>
    </header>
  );
};

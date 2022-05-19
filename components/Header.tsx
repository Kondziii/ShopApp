import { useRef } from 'react';
import { CartBar } from './cart/CartBar';
import { Logo } from './Logo';
import { MenuButton } from './MenuButton';
import { Navigation } from './Navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TopBar } from './TopBar';
import { UserIcon, HeartIcon } from '@heroicons/react/solid';
import { MenuItem } from '@szhsin/react-menu';
import { Menu } from './Menu';
import { UserBar } from './UserBar';

export const Header = () => {
  const session = useSession();
  const router = useRouter();
  const nav = useRef<HTMLUListElement>(null);

  const handleToggleMenu = () => {
    if (nav.current && nav.current.style.height === '0px') {
      nav.current.style.height = nav.current.scrollHeight + 'px';
    } else if (nav.current) {
      nav.current.style.height = '0';
    }
  };

  const register = () => {
    router.push('/signup');
  };

  return (
    <header className='sticky top-0 z-[999]'>
      <TopBar />
      <div className=' px-8 py-5 text-sm font-semibold text-gray-500 uppercase bg-white shadow-md sm:flex sm:items-center'>
        <div className='container flex flex-wrap items-center justify-between mx-auto sm:flex-nowrap max-w-7xl'>
          <MenuButton onClick={handleToggleMenu} />
          <Logo></Logo>

          <div className='flex items-center space-x-4 sm:order-3'>
            <Menu as={<UserBar />}>
              {session.status === 'unauthenticated' && (
                <>
                  <MenuItem className='text-gray-700 text-sm capitalize hover:bg-yellow-100 transition duration-300'>
                    <button
                      onClick={() =>
                        router.push({
                          pathname: '/signin',
                          query: { callbackUrl: router.asPath },
                        })
                      }
                    >
                      Logowanie
                    </button>
                  </MenuItem>
                  <MenuItem className='text-gray-700 text-sm capitalize hover:bg-yellow-100 transition duration-300'>
                    <button onClick={register}>Rejestracja</button>
                  </MenuItem>
                </>
              )}
              {session.status === 'authenticated' && (
                <>
                  <MenuItem className='text-gray-700 hover:bg-yellow-100 transition duration-300'>
                    <button>Twoje zamówienia</button>
                  </MenuItem>
                  <MenuItem className='text-gray-700 hover:bg-yellow-100 transition duration-300'>
                    <button onClick={() => signOut()}>Wyloguj</button>
                  </MenuItem>
                </>
              )}
            </Menu>
            {session.status === 'authenticated' && (
              <HeartIcon className='h-7 text-gray-600' />
            )}
            <CartBar />
          </div>

          <Navigation ref={nav}></Navigation>
        </div>
      </div>
    </header>
  );
};

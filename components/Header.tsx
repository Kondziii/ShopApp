import { useRef } from 'react';
import { CartBar } from './cart/CartBar';
import { Logo } from './Logo';
import { MenuButton } from './MenuButton';
import { Navigation } from './Navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TopBar } from './TopBar';

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
    <header className='sticky top-0 z-50'>
      <TopBar />
      <div className=' px-8 py-5 text-sm font-semibold text-gray-500 uppercase bg-white shadow-md sm:flex sm:items-center'>
        <div className='container flex flex-wrap items-center justify-between mx-auto sm:flex-nowrap max-w-7xl'>
          <MenuButton onClick={handleToggleMenu} />
          <Logo></Logo>

          <div className='flex items-center space-x-4 sm:order-3'>
            <CartBar />

            {session.status === 'authenticated' && (
              <button
                onClick={() => signOut()}
                className='px-4 py-2 transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:text-white hover:bg-slate-700'
              >
                Logout
              </button>
            )}

            {session.status === 'unauthenticated' && (
              <>
                <button
                  onClick={register}
                  className='px-4 py-2 transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:text-white hover:bg-slate-700'
                >
                  Register
                </button>
                <button
                  onClick={() =>
                    router.push({
                      pathname: '/signin',
                      query: { callbackUrl: router.asPath },
                    })
                  }
                  className='px-4 py-2 text-white transition duration-300 border rounded-full bg-slate-700 border-slate-700 hover:bg-slate-800'
                >
                  Login
                </button>
              </>
            )}
          </div>

          <Navigation ref={nav}></Navigation>
        </div>
      </div>
    </header>
  );
};

import { Transition } from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { useUserState } from './UserContext';

export const CookiePopUp = () => {
  const userState = useUserState();

  return (
    <Transition
      appear
      show={!userState.cookieAgreement}
      as={Fragment}
      enter='ease-out duration-1000'
      enterFrom='translate-y-[1000px]'
      enterTo='translate-y-0'
      leave='ease-in duration-1000'
      leaveFrom='translate-y-0'
      leaveTo='translate-y-[1000px]'
    >
      <div className='fixed bottom-0 left-0 w-full text-white bg-[#0C7163]  z-[9999] p-4'>
        <div className='items-center justify-between mx-auto md:flex md:first-line:flex max-w-7xl'>
          <p className='py-6 '>
            Nasza strona internetowa wykorzystuje pliki cookies (tzw.
            ciasteczka). Zapoznaj się z{' '}
            <Link href='/policy'>
              <a className='text-yellow-400 transition duration-300 hover:text-yellow-500'>
                naszą polityką prywatności
              </a>
            </Link>
            .
          </p>
          <div className='text-center'>
            <button
              onClick={() => userState.saveCookieAgreement()}
              type='button'
              className='px-4 py-2 transition duration-300 border rounded-full border-[#073F36] hover:bg-[#0A6053]'
            >
              Wyrażam zgodę
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface AppDisclosureProps {
  header: String;
  content: String;
}

export const AppDisclosure = ({ header, content }: AppDisclosureProps) => {
  return (
    <Disclosure as='div' className='mt-2'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75'>
            <span>{header}</span>
            <ChevronDownIcon
              className={`${
                open
                  ? 'rotate-180 transition duration-200 transform'
                  : '-rotate-0 transition duration-200 transform'
              } h-5 w-5 text-yellow-500`}
            />
          </Disclosure.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-0 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
              {content}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

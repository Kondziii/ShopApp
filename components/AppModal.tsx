import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface AppModalProps {
  btnCaption: string;
  leftIcon: React.ReactNode;
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
}

export default function AppModal({
  btnCaption,
  leftIcon,
  isVisible = false,
  title,
  children,
}: AppModalProps) {
  let [isOpen, setIsOpen] = useState(isVisible);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='px-4 py-2 transition duration-300 rounded-full hover:bg-yellow-100'
      >
        {leftIcon && leftIcon}
        {btnCaption}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[99999999]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {title}
                  </Dialog.Title>
                  {children}

                  <div className='mt-4 text-right'>
                    <button
                      type='button'
                      className=' rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 transition duration-300'
                      onClick={closeModal}
                    >
                      Zamknij
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

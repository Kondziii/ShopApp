import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface AppModalProps {
  btnCaption?: string;
  leftIcon?: React.ReactNode;
  isVisible?: boolean;
  title?: string;
  children: React.ReactNode;
  panelClassName?: string;
  customBtn?: React.ReactNode;
}

export default function AppModal({
  btnCaption,
  leftIcon,
  isVisible = false,
  title,
  children,
  panelClassName,
  customBtn,
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
      {!customBtn && (
        <button
          type='button'
          onClick={openModal}
          className='px-4 py-2 transition duration-300 rounded-full hover:bg-yellow-100'
        >
          {leftIcon && leftIcon}
          {btnCaption}
        </button>
      )}
      {customBtn && (
        <div className='cursor-pointer' onClick={openModal}>
          {customBtn}
        </div>
      )}

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
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-full p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={`${
                    panelClassName
                      ? panelClassName
                      : 'w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'
                  }`}
                >
                  {title && (
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children}

                  <div className='mt-4 text-right'>
                    <button
                      type='button'
                      className='px-4 py-2 text-sm font-medium text-yellow-900 transition duration-300 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2'
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

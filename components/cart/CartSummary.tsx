import { useCartState } from './CartContext';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';

export const CartSummary = () => {
  const cartState = useCartState();

  return (
    <div className='w-full h-full p-12 text-center bg-yellow-200 '>
      <hr className='w-9/12 h-1 mx-auto mt-4 bg-black border-0' />
      <div className='flex items-center justify-center h-28'>
        <p>
          <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500'>
            Cart total
          </span>
          <span className='text-lg font-bold'>
            {cartState.getTotalPrice()}$
          </span>
        </p>
      </div>
      <Link href={'/checkout'}>
        <a className='flex items-center justify-center gap-2 px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'>
          Checkout <LockClosedIcon className='inline w-4 h-4' />
        </a>
      </Link>
    </div>
  );
};

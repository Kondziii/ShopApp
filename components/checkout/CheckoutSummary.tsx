import React from 'react';
import { useCartState } from '../cart/CartContext';
import Image from 'next/image';
export const CheckoutSummary = () => {
  const cartState = useCartState();

  return (
    <aside className='order-first p-8 bg-yellow-200 md:order-last col-span-full md:col-span-4'>
      <header className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-wide '>Your cart</h1>
        <span className='px-4 py-1 text-xl text-white rounded-full bg-slate-700'>
          {cartState.getTotalAmount()}
        </span>
      </header>
      <ul className='divide-y divide-black'>
        {cartState.items.map((item) => {
          return (
            <li
              key={item.id}
              className='flex items-center justify-between max-h-36'
            >
              <div className='w-1/4 '>
                <Image
                  src={item.thumbnailSrc}
                  alt={item.thumbnailAlt}
                  layout='responsive'
                  objectFit='contain'
                  width={3}
                  height={4}
                />
              </div>
              <div className='text-lg'>
                {item.count} * <b>${item.price}</b>
              </div>
            </li>
          );
        })}
        <li className='flex items-center justify-between pt-4 max-h-36'>
          <span className='text-lg'>Total</span>
          <span className='text-lg font-bold'>
            ${cartState.getTotalPrice()}
          </span>
        </li>
      </ul>
    </aside>
  );
};

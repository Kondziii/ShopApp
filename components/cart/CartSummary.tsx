import { useCartState } from './CartContext';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const CartSummary = () => {
  const cartState = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Something went wrong.');
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        cartState.items.map((item) => {
          return {
            slug: item.slug,
            count: item.count,
          };
        })
      ),
    });

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await response.json();

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className='w-full h-full p-12 text-center bg-yellow-200 '>
      <h1 className='w-9/12 mx-auto text-2xl font-bold tracking-wide text-left'>
        Your cart
      </h1>
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
      {/* <Link href={'/checkout'}>
        <a className='flex items-center justify-center gap-2 px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'>
          Checkout <LockClosedIcon className='inline w-4 h-4' />
        </a>
      </Link> */}
      <button
        onClick={pay}
        className='flex items-center justify-center gap-2 px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'
      >
        Checkout <LockClosedIcon className='inline w-4 h-4' />
      </button>
    </div>
  );
};

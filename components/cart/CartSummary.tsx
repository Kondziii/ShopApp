import { useCartState } from './CartContext';
import Link from 'next/link';
import { LockClosedIcon } from '@heroicons/react/solid';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
import { formatPrice } from '../utils/functions';
import yup from '../../yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppCheckbox } from '../AppCheckbox';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const cartContextFormSchema = yup
  .object({
    regulations: yup.boolean().required().isTrue('Pole jest wymagane.'),
    return: yup.boolean().required().isTrue('Pole jest wymagane.'),
    rodo: yup.boolean().required().isTrue('Pole jest wymagane.'),
    news: yup.boolean(),
  })
  .required();

type CartContextFormType = yup.InferType<typeof cartContextFormSchema>;

export const CartSummary = () => {
  const cartState = useCartState();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CartContextFormType>({
    resolver: yupResolver(cartContextFormSchema),
  });

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
            size: item.size,
          };
        })
      ),
    });

    const json = await response.json();

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      json;
    cartState.saveOrderId(json.orderId);

    stripe.redirectToCheckout({ sessionId: session.id });
  };

  const onSubmit = handleSubmit(() => {
    pay();
  });

  useEffect(() => {
    if (isSubmitSuccessful) setIsRedirecting(true);
    else setIsRedirecting(false);
  }, [isSubmitSuccessful]);

  return (
    <div className='w-full h-full p-12 text-center bg-yellow-200 '>
      <h1 className='w-9/12 mx-auto text-2xl font-bold tracking-wide text-left'>
        Twój koszyk
      </h1>
      <hr className='w-9/12 h-1 mx-auto mt-4 bg-black border-0' />
      <table className='mx-auto my-10'>
        <tbody>
          <tr>
            <td>
              <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500 '>
                Koszyk
              </span>
            </td>
            <td>
              <span className='text-lg font-bold'>
                {formatPrice(cartState.getTotalPrice())} zł
              </span>
            </td>
          </tr>
          <tr className='py-2 border-b-2 border-black'>
            <td>
              <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500'>
                Dostawa
              </span>
            </td>
            <td>
              <span className='text-lg font-bold'>
                {cartState.getTotalPrice() < 10000 ? '25.00 zł' : '0.00 zł'}
              </span>
            </td>
          </tr>
          <tr>
            <td className='py-2'>
              <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500'>
                Suma
              </span>
            </td>
            <td>
              <span className='text-lg font-bold'>
                {formatPrice(
                  cartState.getTotalPrice() < 10000
                    ? cartState.getTotalPrice() + 2500
                    : cartState.getTotalPrice()
                )}{' '}
                zł
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className='flex items-center justify-center mt-12 mb-2'>
        <p>
          <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500'>
            Suma
          </span>
          <span className='text-lg font-bold'>
            {formatPrice(cartState.getTotalPrice())} zł
          </span>
        </p>
      </div>
      <div className='flex items-center justify-center mb-12'>
        <p>
          <span className='mx-4 text-xs font-bold tracking-widest uppercase text-stone-500'>
            Dostawa
          </span>
          <span className='text-lg font-bold'>
            {cartState.getTotalPrice() > 10000 ? '25.00 zł' : '0.00 zł'}
          </span>
        </p>
      </div> */}
      {/* <Link href={'/checkout'}>
        <a className='flex items-center justify-center gap-2 px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'>
          Checkout <LockClosedIcon className='inline w-4 h-4' />
        </a>
      </Link> */}
      <form onSubmit={onSubmit} className='block w-9/12 mx-auto'>
        <fieldset className='my-2'>
          <AppCheckbox
            id='regulations'
            {...register('regulations')}
            error={errors.regulations}
            custom_label={
              <label
                htmlFor='regulations'
                className='text-xs tracking-normal text-left text-black'
              >
                *Akcpetuję warunki{' '}
                <Link href={'/regulations'}>
                  <a className='underline text-slate-500'>Regulaminu</a>
                </Link>{' '}
              </label>
            }
          />
          <AppCheckbox
            container_classes='my-2'
            id='return'
            {...register('return')}
            custom_label={
              <label
                htmlFor='return'
                className='text-xs tracking-normal text-left text-black'
              >
                *Zapoznałem się z{' '}
                <Link href={'/return'}>
                  <a className='underline text-slate-500'>
                    prawem zwrotu towaru.
                  </a>
                </Link>{' '}
              </label>
            }
            error={errors.return}
          />
          <AppCheckbox
            container_classes='my-2'
            id='rodo'
            {...register('rodo')}
            custom_label={
              <label
                htmlFor='rodo'
                className='text-xs tracking-normal text-left text-black'
              >
                *Wyrażam zgodę na przetwarzanie danych osobowych.
              </label>
            }
            error={errors.rodo}
          />
          <AppCheckbox
            container_classes='my-2'
            id='news'
            {...register('news')}
            custom_label={
              <label
                htmlFor='news'
                className='text-xs tracking-normal text-left text-black'
              >
                Wyrażam zgodę na otrzymywanie informacji o naszej ofercie,
                promocjach i aktualnościach.
              </label>
            }
            error={errors.news}
          />
        </fieldset>

        <button
          type='submit'
          disabled={isRedirecting}
          className='flex items-center justify-center gap-2 px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white disabled:hover:bg-transparent disabled:text-slate-700'
        >
          Przejdź do płatności{' '}
          {!isRedirecting && <LockClosedIcon className='inline w-4 h-4' />}
          {isRedirecting && (
            <ClipLoader color={'rgb(51, 65, 85)'} loading={true} size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

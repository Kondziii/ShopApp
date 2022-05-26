import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppSpinner } from '../../components/AppSpinner';
import { CartContent } from '../../components/cart/CartContent';
import { CartItem, useCartState } from '../../components/cart/CartContext';
import { CartItemList } from '../../components/CartItemList';
import { UpdateOrderStripeMutation } from '../../generated/graphql';
import Image from 'next/image';
import { formatPrice } from '../../components/utils/functions';
import { AfterPaymentInfo } from '../../components/AfterPaymentInfo';
import { useSession } from 'next-auth/react';

const CheckoutSuccessPage = () => {
  const router = useRouter();
  const cartState = useCartState();
  const [data, setData] = useState<{
    data: UpdateOrderStripeMutation | null | undefined;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const getData = async () => {
    const res = await fetch('/api/paymentSuccess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: cartState.orderId,
        stripeId: router.query.session_id,
        email: session.data!.user.email,
      }),
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    if (cartState.items) {
      cartState.removeCart();
    }
    if (cartState.orderId && router.query.session_id && session.data?.user) {
      getData();
    }
  }, [cartState.orderId, router.query.session_id, session.data]);

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h1 className='block my-4 text-2xl text-center'>
        Twoje zamówienie zostało złożone.
      </h1>
      <div>
        {data && !loading && data.data && data.data.updateOrder && (
          <CartItemList
            product={data.data.updateOrder.cartItems.map((item) => {
              return {
                id: item.id,
                price: item.price,
                amount: item.amount,
                size: item.size,
                slug: item.product!.slug,
                image: item.product!.images[0].url,
                name: item.product!.name,
              };
            })}
          />
        )}
      </div>
      {!data && (
        <div className='flex items-center justify-center flex-grow'>
          <AppSpinner />
        </div>
      )}
      <AfterPaymentInfo>
        <h2 className='my-3 text-xl text-center font-bolder'>
          Dziękujemy za zakup i zapraszamy ponownie!
        </h2>
        <p className='w-10/12 mx-auto text-sm text-justify text-gray-500 text center'>
          Zamówienie zostanie przez nas rozpatrzone i powinno do ciebie dotrzeć
          w przeciągu kilku dni. Status zamówienia możesz podejrzeć w zakładce
          twoje zamówienia, gdy jesteś zalogowany.
        </p>

        <div className='my-3 text-center'>
          <Link href={'/orders'}>
            <a className='mb-2 text-lg text-yellow-500 transition duration-300 hover:text-yellow-600'>
              Twoje zamówienia
            </a>
          </Link>
        </div>
      </AfterPaymentInfo>
    </div>
  );
};

export default CheckoutSuccessPage;

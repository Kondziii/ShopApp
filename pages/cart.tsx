import { CartContent } from '../components/cart/CartContent';
import { CartSummary } from '../components/cart/CartSummary';
import { useCartState } from '../components/cart/CartContext';
import { EmptyList } from '../components/cart/EmptyList';

const CartPage = () => {
  const cartState = useCartState();
  return (
    <>
      {cartState.items.length !== 0 ? (
        <div className='flex-grow grid-cols-3 lg:grid'>
          <section className='h-full col-span-full lg:col-span-2'>
            <CartContent />
          </section>
          <section className='h-full col-span-full lg:col-span-1'>
            <CartSummary />
          </section>
        </div>
      ) : (
        <div className='flex items-center h-[65vh]'>
          <EmptyList
            title='Twój koszyk jest pusty'
            description='Zapoznaj się z naszą ofertą i dodaj wybrane produkty do koszyka.'
            to='/offer'
            linkCaption='Przejdź do oferty'
          />
        </div>
      )}
    </>
  );
};

export default CartPage;

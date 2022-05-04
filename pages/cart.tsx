import { CartContent } from '../components/cart/CartContent';
import { CartSummary } from '../components/cart/CartSummary';
import { useCartState } from '../components/cart/CartContext';
import { EmptyCart } from '../components/cart/EmptyCart';

const CartPage = () => {
  const cartState = useCartState();
  return (
    <>
      {cartState.items.length !== 0 ? (
        <div className='flex-grow grid-cols-3 sm:grid'>
          <section className='h-full col-span-2'>
            <CartContent />
          </section>
          <section className='h-full'>
            <CartSummary />
          </section>
        </div>
      ) : (
        <div className='flex items-center h-[65vh]'>
          <EmptyCart></EmptyCart>
        </div>
      )}
    </>
  );
};

export default CartPage;

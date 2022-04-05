import { CartContent } from '../components/cart/CartContent';
import { CartSummary } from '../components/cart/CartSummary';
import { useCartState } from '../components/cart/CartContext';
import { EmptyCart } from '../components/cart/EmptyCart';

const CartPage = () => {
  const cartState = useCartState();

  return (
    <div className='h-full'>
      {cartState.items.length !== 0 ? (
        <div className='grid-cols-3 overflow-auto sm:grid'>
          <section className='col-span-2'>
            <CartContent />
          </section>
          <section>
            <CartSummary />
          </section>
        </div>
      ) : (
        <div className='flex items-center h-[65vh]'>
          <EmptyCart></EmptyCart>
        </div>
      )}
    </div>
  );
};

export default CartPage;

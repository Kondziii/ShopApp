import { useCartState } from '../components/cart/CartContext';

export const CartContent = () => {
  const cartState = useCartState();

  return (
    <ul className='divide-y-2 divide-gray-200'>
      {cartState.items.map((item, index) => {
        return (
          <li
            className='flex justify-between p-4 transition duration-300 hover:bg-gray-200 '
            key={`${item.title}_${index}`}
          >
            <span>{item.title}</span>
            <div className='flex items-center space-x-3'>
              <span>{item.count}</span>
              <span>{item.price}</span>
              <button onClick={() => cartState.removeFromCart(item.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 text-red-500 transition duration-300 hover:text-red-700'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const CartSummary = () => {
  const cartState = useCartState();

  return <div>Cart contains {cartState.items.length} items.</div>;
};

const Cart = () => {
  const cartState = useCartState();

  return (
    <div className='grid-cols-3 gap-8 sm:grid'>
      <section className='col-span-2'>
        <CartContent />
      </section>
      <section>
        <CartSummary />
      </section>
    </div>
  );
};

export default Cart;

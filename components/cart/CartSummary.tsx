import { useCartState } from './CartContext';

export const CartSummary = () => {
  const cartState = useCartState();

  return <div className='w-full h-full bg-yellow-200'></div>;
};

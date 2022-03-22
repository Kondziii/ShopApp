import { useCartState } from '../components/cart/CartContext';

const Cart = () => {
  const cartState = useCartState();

  return (
    <ul>
      {cartState.items.map((item, index) => {
        return (
          <li key={`${item.title}_${index}`}>
            <p>
              {item.title}, {item.price}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cart;

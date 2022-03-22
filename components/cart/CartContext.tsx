import { createContext, ReactNode, useContext, useState } from 'react';

interface CartItem {
  title: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      title: 'Koszulka',
      price: 40,
    },
  ]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartState = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext)
    throw Error(`You haven't registered cart context provider!`);

  return cartContext;
};

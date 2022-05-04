import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CartItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly price: number;
  readonly thumbnailSrc: string;
  readonly thumbnailAlt: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  changeAmount: (id: string, count: number) => void;
  getTotalPrice: () => number;
  getTotalAmount: () => number;
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getTotalPrice = () => {
    return cartItems.reduce((prev, curr) => {
      prev += curr.count * curr.price;
      return prev;
    }, 0);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((prev, curr) => {
      prev += curr.count;
      return prev;
    }, 0);
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((_item) => item.id === _item.id);

      if (!existingItem) return [...prevItems, item];

      return prevItems.map((_item) => {
        if (_item.id === item.id)
          return {
            ..._item,
            count: _item.count + 1,
          };
        return _item;
      });
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      // const existingItem = prevItems.find((item) => item.id === id);

      // if (existingItem && existingItem.count <= 1)
      return prevItems.filter((item) => item.id !== id);

      // return prevItems.map((item) => {
      //   if (item.id === id)
      //     return {
      //       ...item,
      //       count: item.count - 1,
      //     };
      //   return item;
      // });
    });
  };

  const changeAmount = (id: string, count: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id)
          return {
            ...item,
            count,
          };
        return item;
      });
    });
  };

  const storeCartItems = (items: CartItem[]) => {
    localStorage.setItem('SHOPPING_CART', JSON.stringify(items));
  };

  const getStoredCartItems = () => {
    const itemsFromStorage = localStorage.getItem('SHOPPING_CART');

    if (!itemsFromStorage) return;

    try {
      const items = JSON.parse(itemsFromStorage);
      setCartItems(items);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    getStoredCartItems();
  }, []);

  useEffect(() => {
    storeCartItems(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        changeAmount,
        getTotalAmount,
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

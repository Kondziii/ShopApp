import Image from 'next/image';
import { useCartState } from './CartContext';
import { TrashIcon } from '@heroicons/react/solid';

export const CartContent = () => {
  const cartState = useCartState();

  const totalAmount = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <table className='w-full p-6 overflow-x-auto bg-white rounded shadow-sm table-auto'>
      <thead className='table-header-group border-b border-b-slate-300'>
        <tr>
          <th className='py-6 text-sm text-gray-500 uppercase w-50'>Product</th>
          <th className='py-6 text-sm text-gray-500 uppercase w-50'>Price</th>
          <th className='py-6 text-sm text-gray-500 uppercase w-50'>
            Quantity
          </th>
          <th className='py-6 text-sm text-gray-500 uppercase w-50' scope='col'>
            <span className='sr-only'>Delete</span>
          </th>
        </tr>
      </thead>
      <tbody className='divide-y'>
        {cartState.items.map((item) => (
          <tr
            key={item.id}
            className='text-center transition-all duration-200 hover:bg-gray-50'
          >
            <td>
              <div className='w-7/12 mx-auto'>
                <Image
                  layout='responsive'
                  objectFit='contain'
                  width={3}
                  height={4}
                  src={item.thumbnailSrc}
                  alt={item.thumbnailAlt}
                />
              </div>
            </td>
            <td>{totalAmount(item.price, item.count)}$</td>
            <td>{item.count}</td>
            <td>
              <button
                onClick={() => cartState.removeFromCart(item.id)}
                className='text-center'
              >
                <TrashIcon className='w-6 h-6 text-red-500 ' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

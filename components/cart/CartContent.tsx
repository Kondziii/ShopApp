import Image from 'next/image';
import { useCartState } from './CartContext';
import { TrashIcon } from '@heroicons/react/solid';
import { formatPrice } from '../utils/functions';
import Link from 'next/link';
import { AppTooltip } from '../AppTooltip';

export const CartContent = () => {
  const cartState = useCartState();

  const totalAmount = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <table className='w-full p-6 overflow-x-auto bg-white rounded shadow-sm table-auto'>
      <thead className='table-header-group border-b border-b-slate-300'>
        <tr>
          <th className='py-6 text-xs tracking-widest uppercase text-stone-500 w-50'>
            Produkt
          </th>
          <th className='py-6 text-xs tracking-widest uppercase text-stone-500 '>
            Cena
          </th>
          <th className='py-6 text-xs tracking-widest uppercase text-stone-500 '>
            Rozmiar
          </th>
          <th className='py-6 text-xs tracking-widest uppercase text-stone-500 w-50'>
            Ilość
          </th>
          <th
            className='py-6 text-xs uppercase text-stone-500 w-50'
            scope='col'
          >
            <span className='sr-only'>Usuń</span>
          </th>
        </tr>
      </thead>
      <tbody className='divide-y'>
        {cartState.items.map((item) => (
          <tr
            key={item.id}
            className='text-center transition-all duration-200 '
          >
            <td>
              <Link href={`/offer/products/${item.slug}`} passHref>
                <div className='w-7/12 mx-auto cursor-pointer'>
                  <Image
                    layout='responsive'
                    objectFit='contain'
                    width={3}
                    height={4}
                    src={item.thumbnailSrc}
                    alt={item.thumbnailAlt}
                  />
                </div>
              </Link>
            </td>
            <td>
              <span className='block'>{formatPrice(item.price)} zł</span>
              {item.count > 1 && (
                <span className='block text-gray-500'>
                  {formatPrice(totalAmount(item.price, item.count))} zł
                </span>
              )}
            </td>
            <td>{item.size}</td>
            <td>
              <input
                className='w-16 mx-auto bg-transparent border-0'
                type='number'
                step={1}
                value={item.count}
                onChange={(event) => {
                  cartState.changeAmount(item.id, +event.target.value);
                }}
                min={1}
                max={99}
              />
            </td>
            <td>
              <button
                onClick={() => cartState.removeFromCart(item.id)}
                className='text-center'
              >
                <AppTooltip message='Usuń produkt'>
                  <TrashIcon className='w-6 h-6 text-red-500 ' />
                </AppTooltip>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

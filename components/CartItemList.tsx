import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { formatPrice } from './utils/functions';

interface CartItemList {
  product: {
    id: string;
    price: number;
    amount: number;
    size: string;
    slug: string;
    image: string;
    name: string;
  }[];
}

export const CartItemList = ({ product }: CartItemList) => {
  const totalAmount = (price: number, quantity: number) => {
    return price * quantity;
  };

  const totalPrice = () => {
    return product.reduce((curr, val) => {
      return (curr += val.price * val.amount);
    }, 0);
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
        </tr>
      </thead>
      <tbody className='divide-y'>
        {product.map((item) => (
          <tr
            key={item.id}
            className='text-center transition-all duration-200 '
          >
            <td>
              <Link href={`/offer/products/${item.slug}`} passHref>
                <div className='relative w-5/12 mx-auto cursor-pointer'>
                  <Image
                    layout='responsive'
                    objectFit='contain'
                    width={3}
                    height={4}
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </Link>
              <figcaption className='w-full text-gray-500'>
                {item.name}
              </figcaption>
            </td>
            <td>
              <span className='block'>{formatPrice(item.price)} zł</span>
              {item.amount > 1 && (
                <span className='block text-gray-500'>
                  {formatPrice(totalAmount(item.price, item.amount))} zł
                </span>
              )}
            </td>
            <td>{item.size}</td>
            <td>
              <input
                className='w-16 mx-auto bg-transparent border-0'
                type='number'
                step={1}
                value={item.amount}
                readOnly
              />
            </td>
          </tr>
        ))}
        <tr>
          <td className='p-2 text-center'>Zapłacono:</td>
          <td className='p-2 text-center text-yellow-500'>
            {formatPrice(totalPrice())} zł {totalPrice() < 10000 && '+ 25'} zł
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

import Image from 'next/image';
import Link from 'next/link';
import { useCartState } from './cart/CartContext';
import ProductDetails from './ProductDetails';
import { formatPrice, sexCaption } from './utils/functions';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline';
import { FavouriteBtn } from './FavouriteBtn';
import { useSession } from 'next-auth/react';

type ProductListItem = Pick<
  ProductDetails,
  | 'id'
  | 'title'
  | 'thumbnailSrc'
  | 'thumbnailAlt'
  | 'price'
  | 'slug'
  | 'discount'
  | 'sex'
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  const session = useSession();

  return (
    <Link href={`/offer/products/${data.slug}`} passHref>
      <li className='group relative text-sm sm:text-base p-6 pt-10 transition-all duration-300 bg-white rounded shadow cursor-pointer hover:shadow-lg'>
        <span className='bg-green-600 text-white absolute top-5 left-5 rounded-full text-xxs px-2 py-1 lowercase'>
          {sexCaption(data.sex)}
        </span>
        {session.status === 'authenticated' && (
          <FavouriteBtn itemId={data.id} />
        )}

        <div className='w-full relative'>
          <Image
            layout='responsive'
            width={4}
            height={3}
            objectFit='contain'
            src={data.thumbnailSrc}
            alt={data.thumbnailAlt}
          />
        </div>

        <h2 className='mt-4 mb-1 font-medium '>{data.title}</h2>
        <p
          className={`font-semibold text-yellow-500 text-bold ${data.discount}`}
        >
          <span className={`${data.discount && 'line-through'}`}>
            {formatPrice(data.price)}
          </span>{' '}
          {data.discount && (
            <span className='text-green-600'>
              {formatPrice(data.price - data.discount)}
            </span>
          )}{' '}
          <span
            className={`${
              data.discount ? 'text-green-600' : 'text-yellow-500'
            }`}
          >
            zł
          </span>
        </p>
        <button
          onClick={() =>
            cartState.addToCart({
              id: data.id,
              slug: data.slug,
              title: data.title,
              thumbnailSrc: data.thumbnailSrc,
              thumbnailAlt: data.thumbnailAlt,
              price: data.price,
              count: 1,
            })
          }
          className='flex items-center space-x-2 rounded-full px-4 py-2 mt-4 text-sm transition duration-300 border  text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-1 ring-slate-500'
        >
          <ShoppingCartIcon className='h-4' />
          <span>Dodaj do koszyka</span>
        </button>
      </li>
    </Link>
  );
};

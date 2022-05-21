import Image from 'next/image';
import Link from 'next/link';
import { useCartState } from './cart/CartContext';
import ProductDetails from './ProductDetails';
import { formatPrice, sexCaption } from './utils/functions';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline';
import { FavouriteBtn } from './FavouriteBtn';
import { useSession } from 'next-auth/react';
import { Rating } from 'react-simple-star-rating';
import { Sex } from '../generated/graphql';

interface ProductListItem {
  id: string;
  title: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  price: number;
  slug: string;
  discount: number;
  sex: Sex;
  rating: number;
  ratingCount: number;
}

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  const session = useSession();

  return (
    <Link href={`/offer/products/${data.slug}`} passHref>
      <li className='relative z-20 p-6 py-10 text-base transition-all duration-300 bg-white rounded shadow cursor-pointer sm:text-sm group sm:text-base hover:shadow-lg'>
        <span className='absolute px-2 py-1 text-white lowercase bg-green-600 rounded-full top-5 left-5 text-xxs'>
          {sexCaption(data.sex)}
        </span>
        {session.status === 'authenticated' && (
          <FavouriteBtn itemId={data.id} />
        )}

        {data.thumbnailSrc && (
          <div className='relative w-full'>
            <Image
              layout='responsive'
              width={4}
              height={3}
              objectFit='contain'
              src={data.thumbnailSrc}
              alt={data.thumbnailAlt}
            />
          </div>
        )}

        <h2 className='mt-4 mb-1 font-medium '>{data.title}</h2>

        <div className=''>
          <Rating
            ratingValue={data.rating * 20}
            readonly
            size={20}
            allowHalfIcon
            onClick={(e) => console.log(e)}
            className='transform -translate-y-1'
          />
          <span className='ml-1 text-xs font-medium'>({data.ratingCount})</span>
        </div>

        <p
          className={`font-semibold text-yellow-500 text-bold mt-1  ${data.discount}`}
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
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            cartState.addToCart({
              id: data.id,
              slug: data.slug,
              title: data.title,
              thumbnailSrc: data.thumbnailSrc,
              thumbnailAlt: data.thumbnailAlt,
              price: data.price,
              count: 1,
            });
          }}
          className='flex items-center px-4 py-2 mt-4 space-x-2 text-sm transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-1 ring-slate-500'
        >
          <ShoppingCartIcon className='h-4' />
          <span>Dodaj do koszyka</span>
        </button> */}
      </li>
    </Link>
  );
};

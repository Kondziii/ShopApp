import Image from 'next/image';
import Link from 'next/link';
import { useCartState } from './cart/CartContext';
import ProductDetails from './ProductDetails';

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailSrc' | 'thumbnailAlt' | 'price' | 'slug'
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();

  return (
    <li className='flex flex-col items-center p-6 transition-all duration-300 bg-white rounded shadow-md group hover:scale-105 hover:shadow-xl '>
      <div className='w-full'>
        <Image
          layout='responsive'
          width={4}
          height={3}
          objectFit='contain'
          src={data.thumbnailSrc}
          alt={data.thumbnailAlt}
        />
      </div>
      <Link href={`/offer/products/${data.slug}`}>
        <a>
          <h2 className='mt-4 mb-2 text-lg font-medium text-center '>
            {data.title}
          </h2>
        </a>
      </Link>
      <p className='text-2xl font-semibold text-yellow-500 text-bold sm:text-xl'>
        {data.price}$
      </p>
      <button
        onClick={() =>
          cartState.addToCart({
            id: data.id,
            title: data.title,
            price: data.price,
            count: 1,
          })
        }
        className='px-4 py-2 mt-4 text-sm transition duration-300 border rounded-md text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-1 ring-slate-500'
      >
        Dodaj do koszyka
      </button>
    </li>
  );
};

import { faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetails from './ProductDetails';

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailSrc' | 'thumbnailAlt' | 'price'
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <li className='flex flex-col items-center p-4 transition-all duration-300 bg-white rounded shadow-md group hover:scale-105 hover:shadow-xl '>
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
      <Link href={`/offer/products/${data.id}`}>
        <a>
          <h2 className='mt-4 mb-2 text-lg font-medium text-center '>
            {data.title}
          </h2>
        </a>
      </Link>
      <p className='text-2xl font-semibold text-yellow-500 text-bold sm:text-xl'>
        {data.price}$
      </p>
      <section className='flex justify-between invisible w-4/5 mx-auto transition duration-300 group-hover:visible'>
        <button className='flex items-center justify-center w-12 h-12 px-4 py-2 mt-6 text-xl text-gray-200 rounded-full bg-slate-700 hover:bg-slate-600 focus:bg-slate-800 focus:ring ring-yellow-400/50 focus:outline-none'>
          <FontAwesomeIcon className='' icon={faCartArrowDown} />
        </button>
        <button className='flex items-center justify-center w-12 h-12 px-4 py-2 mt-6 text-xl text-gray-200 rounded-full bg-slate-700 hover:bg-slate-600 focus:bg-slate-800 focus:ring ring-yellow-400/50 focus:outline-none'>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </section>
    </li>
  );
};

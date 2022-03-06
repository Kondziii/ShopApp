import Image from 'next/image';
import Link from 'next/link';
import ProductDetails from './ProductDetails';

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailSrc' | 'thumbnailAlt'
>;

interface ProductListItemProps {
  data: ProductListItem;
  isLink?: boolean;
}

export const ProductListItem = ({
  data,
  isLink = true,
}: ProductListItemProps) => {
  return (
    <div className='relative flex flex-col justify-center w-full h-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg align-center hover:shadow-2xl hover:scale-105'>
      <Image
        width={250}
        height={250}
        className='object-contain text-center aspect-video'
        src={data.thumbnailSrc}
        alt={data.thumbnailAlt}
      />
      {isLink ? (
        <Link href={`/products/${data.id}`}>
          <a>
            <h2 className='mt-4 mb-2 text-lg font-medium text-center '>
              {data.title}
            </h2>
          </a>
        </Link>
      ) : (
        <a>
          <h2 className='mt-4 mb-2 text-lg font-medium text-center '>
            {data.title}
          </h2>
        </a>
      )}
    </div>
  );
};

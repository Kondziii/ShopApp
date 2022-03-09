import Image from 'next/image';

export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductDetailsProps {
  data: ProductDetails;
}

interface RatingProps {
  rating: number;
}

const Raiting = ({ rating }: RatingProps) => {
  return (
    <p className='text-xl font-semibold text-yellow-500 md:text-2xl'>
      {rating}
    </p>
  );
};

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <div className='container content-center h-full max-w-5xl gap-8 p-6 mx-auto sm:grid sm:grid-cols-2'>
      <div className='p-4 bg-white rounded-md shadow-md'>
        <Image
          layout='responsive'
          width={4}
          height={3}
          className='object-contain text-center aspect-video'
          src={data.thumbnailSrc}
          alt={data.thumbnailAlt}
        />
      </div>
      <div className='self-start space-y-4'>
        <h2 className='mb-2 text-xl font-medium md:text-2xl '>{data.title}</h2>
        <Raiting rating={data.rating} />
        <p className='font-light text-justify text-gray-600'>
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

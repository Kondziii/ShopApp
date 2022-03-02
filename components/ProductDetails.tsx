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
    <p className='text-xl md:text-2xl text-yellow-500 font-semibold'>
      {rating}
    </p>
  );
};

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <div className='sm:grid sm:grid-cols-2 container max-w-5xl mx-auto h-full content-center gap-8 p-6'>
      <div className='bg-white flex place-content-center shadow-sm rounded-xl p-6'>
        <Image
          width={300}
          height={300}
          className='object-contain text-center aspect-video'
          src={data.thumbnailSrc}
          alt={data.thumbnailAlt}
        />
      </div>
      <div className='space-y-4 self-start'>
        <h2 className='mb-2 text-xl md:text-2xl font-medium '>{data.title}</h2>
        <Raiting rating={data.rating} />
        <p className='font-light text-gray-600 text-justify'>
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

import Image from 'next/image';

interface ProductProps {
  data: {
    id: number;
    title: string;
    description: string;
    thumbnailSrc: string;
    thumbnailAlt: string;
    rating: number;
  };
}

interface RatingProps {
  rating: number;
}

const Raiting = ({ rating }: RatingProps) => {
  return (
    <p className='absolute text-xl font-bold text-yellow-500 top-4 right-4'>
      {rating}
    </p>
  );
};

export const Product = ({ data }: ProductProps) => {
  return (
    <div className='relative flex flex-col justify-center w-full h-full p-4 transition-all duration-300 bg-white rounded-lg shadow-lg align-center hover:shadow-2xl hover:scale-105'>
      <Image
        width={250}
        height={250}
        className='object-contain text-center aspect-video'
        src={data.thumbnailSrc}
        alt={data.thumbnailAlt}
      />
      <div className='px-4'>
        <h2 className='mt-4 mb-2 text-lg font-medium '>{data.title}</h2>
        <Raiting rating={data.rating} />
        <p className='font-light text-gray-600 truncate'>{data.description}</p>
      </div>
    </div>
  );
};

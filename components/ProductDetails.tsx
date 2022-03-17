import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: string;
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
    <div className='container content-center h-full max-w-5xl p-6 mx-auto '>
      <section className='row-start-1 gap-8 sm:grid sm:grid-cols-2 '>
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
          <h2 className='mt-2 mb-2 text-xl font-medium sm:mt-0 md:text-2xl '>
            {data.title}
          </h2>
          <Raiting rating={data.rating} />
          <p className='font-light text-justify text-gray-600'>
            {data.description}
          </p>
        </div>
      </section>
      <hr className='my-6 border-slate-300' />
      <article className='row-start-2 prose lg:prose-xl'>
        <ReactMarkdown>{data.longDescription}</ReactMarkdown>
      </article>
    </div>
  );
};

export default ProductDetails;

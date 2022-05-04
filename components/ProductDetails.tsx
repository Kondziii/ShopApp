import Image from 'next/image';
import { MarkdownResult } from '../types';
import CustomMarkdown from './CustomMarkdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReviewsContainer } from './reviews/ReviewsContainer';

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  slug: string;
  description: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult;
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
  const router = useRouter();
  const v = router.query.v || 'Description';

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
      <nav className='mb-3'>
        <ul className='flex gap-3'>
          <li>
            <Link
              href={{
                pathname: `/offer/products/${data.slug}`,
                query: { v: 'Description' },
              }}
              shallow
              scroll={false}
            >
              <a className='py-1 transition-all duration-300 border-b-4 border-b-transparent hover:border-b-yellow-500'>
                Description
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: `/offer/products/${data.slug}`,
                query: { v: 'Reviews' },
              }}
              shallow
              scroll={false}
            >
              <a className='py-1 transition-all duration-300 border-b-4 border-b-transparent hover:border-b-yellow-500'>
                Reviews
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      {v === 'Description' && (
        <article className='row-start-2 prose lg:prose-xl'>
          <CustomMarkdown>{data.longDescription}</CustomMarkdown>
        </article>
      )}
      {v === 'Reviews' && <ReviewsContainer id={data.id} slug={data.slug} />}
    </div>
  );
};

export default ProductDetails;

import Image from 'next/image';
import { MarkdownResult } from '../types';
import CustomMarkdown from './CustomMarkdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReviewsContainer } from './reviews/ReviewsContainer';
import { FullProductItemFragment, Sex } from '../generated/graphql';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { formatPrice, sexCaption } from './utils/functions';
import { Rating } from 'react-simple-star-rating';
import { AppRadio } from './AppRadio';
import { useForm } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';
import { ProductDetailsForm } from './ProductDetailsForm';
import { ProductDetailsAmount } from './ProductDetailsAmount';
import { ProductDetailsImage } from './ProductDetailsImage';

export interface ProductFullInfoType extends FullProductItemFragment {
  longDescription: MDXRemoteSerializeResult<Record<string, unknown>>;
}
export interface ProductDetailsProps {
  product: ProductFullInfoType;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const v = router.query.v || 'Description';
  const [currSize, setCurrSize] = useState('');

  return (
    <div className='container content-center h-full max-w-5xl p-6 mx-auto '>
      <section className='row-start-1 gap-8 sm:grid sm:grid-cols-2 '>
        <ProductDetailsImage product={product} />
        <div className='self-start mt-4 sm:mt-0'>
          <section className='space-x-2 mb-3'>
            <span className='px-2 py-1 text-sm bg-green-600 text-white rounded-full shadow'>
              {sexCaption(product.sex)}
            </span>
            {product.categories.map((category) => {
              return (
                <span
                  key={category.name}
                  className='px-2 py-1 text-sm bg-yellow-500 text-white rounded-full shadow'
                >
                  {category.name}
                </span>
              );
            })}
          </section>

          <h1 className='mt-2  text-xl font-medium sm:mt-0 md:text-2xl '>
            {product.name}
          </h1>

          <ProductDetailsAmount product={product} currSize={currSize} />

          <section className='mt-4'>
            <div className='my-4'>
              <Rating
                ratingValue={product.rating * 20}
                readonly
                size={30}
                allowHalfIcon
                onClick={(e) => console.log(e)}
              />
              <span className='ml-1 text-sm font-medium'>
                ({product.ratingCount})
              </span>
            </div>
            <p
              className={`text-xl font-semibold text-yellow-500 text-bold mt-4}`}
            >
              <span className={`${product.discount && 'line-through'}`}>
                {formatPrice(product.price)}
              </span>{' '}
              {product.discount && (
                <span className='text-green-600'>
                  {formatPrice(product.discount)}
                </span>
              )}{' '}
              <span
                className={`${
                  product.discount ? 'text-green-600' : 'text-yellow-500'
                }`}
              >
                zł
              </span>
            </p>
            <hr />
            <ProductDetailsForm product={product} setSize={setCurrSize} />
          </section>
        </div>
      </section>
      <hr className='my-6 border-slate-300' />
      <nav className='mb-3'>
        <ul className='flex gap-3'>
          <li>
            <Link
              href={{
                pathname: `/offer/products/${product.slug}`,
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
                pathname: `/offer/products/${product.slug}`,
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
          <CustomMarkdown>{product.longDescription}</CustomMarkdown>
        </article>
      )}
      {v === 'Reviews' && (
        <ReviewsContainer id={product.id} slug={product.slug} />
      )}
    </div>
  );
};

export default ProductDetails;

import Image from 'next/image';
import { MarkdownResult } from '../types';
import CustomMarkdown from './CustomMarkdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReviewsContainer } from './reviews/ReviewsContainer';
import {
  FullProductItemFragment,
  Sex,
  useGetLastProductInfoQuery,
} from '../generated/graphql';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { formatPrice, sexCaption } from './utils/functions';
import { Rating } from 'react-simple-star-rating';
import { AppRadio } from './AppRadio';
import { useForm } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';
import { ProductDetailsForm } from './ProductDetailsForm';
import { ProductDetailsAmount } from './ProductDetailsAmount';
import { ProductDetailsImage } from './ProductDetailsImage';
import { ProductDetailsNav } from './ProductDetailsNav';

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
  const { data } = useGetLastProductInfoQuery({
    variables: {
      productId: product.id,
    },
  });

  return (
    <div className='container content-center h-full max-w-5xl p-6 mx-auto '>
      <section className='row-start-1 gap-8 sm:grid sm:grid-cols-2 '>
        <ProductDetailsImage
          product={{
            ...product,
            ratingCount: data?.reviews.aggregate.count || product.ratingCount,
            rating: data?.product?.rating || product.rating,
          }}
        />
        <div className='self-start mt-4 sm:mt-0'>
          <section className='mb-3 space-x-2'>
            <span className='px-2 py-1 text-sm text-white bg-green-600 rounded-full shadow'>
              {sexCaption(product.sex)}
            </span>
            {product.categories.map((category) => {
              return (
                <span
                  key={category.name}
                  className='px-2 py-1 text-sm text-white bg-yellow-500 rounded-full shadow'
                >
                  {category.name}
                </span>
              );
            })}
          </section>

          <h1 className='mt-2 text-xl font-medium sm:mt-0 md:text-2xl '>
            {product.name}
          </h1>

          <ProductDetailsAmount product={product} currSize={currSize} />

          <section className='mt-4'>
            <div className='my-4'>
              <Rating
                ratingValue={(data?.product?.rating || product.rating) * 20}
                readonly
                size={30}
                allowHalfIcon
                onClick={(e) => console.log(e)}
              />
              <span className='ml-1 text-sm font-medium'>
                (
                {data?.reviews.aggregate.count ||
                  product.ratingCount ||
                  product.ratingCount}
                )
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
                  {formatPrice(product.price - product.discount)}
                </span>
              )}{' '}
              <span
                className={`${
                  product.discount ? 'text-green-600' : 'text-yellow-500'
                }`}
              >
                z??
              </span>
            </p>
            <hr />
            {product.productSizeVariants.reduce((prev, curr) => {
              const current = curr.amount;
              return prev + current;
            }, 0) > 0 ? (
              <ProductDetailsForm
                product={product}
                setSize={setCurrSize}
                currSize={currSize}
              />
            ) : (
              <div className='my-6 '>
                <p className='px-4 py-2 bg-gray-200 rounded-full w-fit'>
                  Niestety produkt jest chwilowo niedost??pny.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
      <hr className='my-6 border-slate-300' />
      <ProductDetailsNav slug={product.slug} />

      {v === 'Description' && (
        <article className='row-start-2 prose lg:prose-lg'>
          <CustomMarkdown>{product.longDescription}</CustomMarkdown>
        </article>
      )}
      {v === 'Reviews' && (
        <ReviewsContainer
          product={{
            ...product,
            ratingCount: data?.reviews.aggregate.count || product.ratingCount,
            rating: data?.product?.rating || product.rating,
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails;

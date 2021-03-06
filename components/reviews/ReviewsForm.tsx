import React, { useState, useEffect } from 'react';
import { Input } from '../Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from '../TextArea';
import { apolloClient } from '../../graphql/graphqlClient';
import {
  GetLastProductInfoDocument,
  GetLastProductInfoQuery,
  GetLastProductInfoQueryVariables,
  GetProductDetailsBySlugDocument,
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  useCreateReviewMutation,
} from '../../generated/graphql';
import { Rating } from 'react-simple-star-rating';
import { useSession } from 'next-auth/react';
import { formRating } from '../utils/functions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ProductFullInfoType } from '../ProductDetails';

const reviewSchema = yup
  .object({
    headline: yup.string().required(),
    content: yup.string().required(),
    rating: yup.number().positive('To pole jest wymagane').required(),
  })
  .required();

type ReviewForm = yup.InferType<typeof reviewSchema>;

interface ProductReviewsProps {
  product: ProductFullInfoType;
}

export const ReviewsForm = ({ product }: ProductReviewsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ReviewForm>({
    resolver: yupResolver(reviewSchema),
  });
  const session = useSession();
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const [createReview, { data, loading, error }] = useCreateReviewMutation({
    refetchQueries: [
      {
        query: GetProductReviewsDocument,
        variables: {
          slug: product.slug,
          skip: 0,
        },
      },
      {
        query: GetProductDetailsBySlugDocument,
        variables: {
          slug: product.slug,
        },
      },
      {
        query: GetLastProductInfoDocument,
        variables: {
          productId: product.id,
        },
      },
    ],

    update(cache, result) {
      const originalData = cache.readQuery<GetProductReviewsQuery>({
        query: GetProductReviewsDocument,
        variables: {
          slug: product.slug,
        },
      });

      if (!originalData || !originalData.product || !result.data?.review) {
        return;
      }

      const updatedData = {
        ...originalData,
        product: {
          ...originalData.product,
          reviews: [result.data.review, ...originalData.product.reviews],
        },
      };

      cache.writeQuery({
        query: GetProductReviewsDocument,
        variables: {
          slug: product.slug,
        },
        data: updatedData,
      });
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await apolloClient.query<
      GetLastProductInfoQuery,
      GetLastProductInfoQueryVariables
    >({
      query: GetLastProductInfoDocument,
      variables: {
        productId: product.id,
      },
      fetchPolicy: 'network-only',
    });

    if (!response.data.product) {
      return;
    }

    await createReview({
      variables: {
        review: {
          headline: values.headline,
          email: session.data!.user.email,
          content: values.content,
          rating: formRating(values.rating),
          product: {
            connect: {
              id: product.id,
            },
          },
        },
        id: product.id,
        rating:
          response.data.product.rating > 0
            ? (response.data.product.rating + formRating(values.rating)) / 2
            : formRating(values.rating),
        ratingCount: response.data.reviews.aggregate.count + 1,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: (-Math.random()).toString(),
          email: session.data!.user.email,
          headline: values.headline,
          content: values.content,
          rating: formRating(values.rating),
          createdAt: Date.now(),
        },
        updateProduct: {
          __typename: 'Product',
          id: product.id,
        },
        publishManyReviewsConnection: {
          __typename: 'ReviewConnection',
          edges: [],
        },
        publishProduct: {
          __typename: 'Product',
          id: product.id,
        },
      },
    });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        headline: '',
        content: '',
      });
      setValue('rating', 0);
      setRatingValue(0);
      setIsFormVisible(false);
    }
  }, [isSubmitSuccessful, reset, setValue]);

  const handleChangeRating = (e: number) => {
    setValue('rating', e);
    if (e !== 0) {
      // setError('rating');
      clearErrors('rating');
    }
  };

  if (session.status === 'unauthenticated') {
    return (
      <section className='block sm:flex items-center justify-between p-8 bg-white rounded shadow'>
        <p>Wyra?? swoj?? opini?? na temat tego produktu.</p>
        <Link
          href={{
            pathname: '/signin',
            query: { callbackUrl: router.asPath },
          }}
        >
          <a className='px-4 py-2 mt-2 sm:mt-0 transition duration-300 border rounded-full border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'>
            Zaloguj si??
          </a>
        </Link>
      </section>
    );
  }

  if (session.status === 'loading') {
    return null;
  }

  return (
    <section className='mt-4'>
      {isFormVisible && (
        <form
          onSubmit={onSubmit}
          className='grid grid-cols-1 p-8 bg-white rounded-md shadow-md sm:grid-cols-12 gap-x-4 gap-y-2'
        >
          <div className='w-[200px]'>
            <label className='w-full mb-1 '>Twoja ocena</label>
            <Rating
              ratingValue={ratingValue}
              initialValue={0}
              size={30}
              allowHalfIcon
              onClick={(e) => {
                handleChangeRating(e);
                setRatingValue(e);
              }}
              {...register('rating')}
            />
            <small className='block text-red-500'>
              {errors.rating?.message}
            </small>
          </div>
          <Input
            {...register('headline')}
            container_classes='sm:col-span-12'
            id='headline'
            type='text'
            label='Nag????wek'
            placeholder='Nag????wek...'
            error={errors.headline}
          ></Input>

          <TextArea
            {...register('content')}
            container_classes='col-span-full'
            id='content'
            rows={4}
            label='Opinia'
            placeholder='Opinia...'
            error={errors.content}
          ></TextArea>
          <div className='flex justify-end mt-2 col-span-full'>
            <button
              type='submit'
              className='px-8 py-2 transition-all duration-300 border-2 rounded-full text-slate-700 border-slate-700 hover:text-white hover:bg-slate-700'
            >
              Opublikuj recenzj??
            </button>
          </div>
        </form>
      )}
      {!isFormVisible && (
        <div className='md:flex md:items-center md:justify-between p-8 bg-white rounded shadow'>
          <p>Wyra?? swoj?? opini?? na temat tego produktu.</p>

          <button
            onClick={() => setIsFormVisible(true)}
            className='block mt-2 sm:mt-0 px-4 py-2 transition duration-300 border rounded-full border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'
          >
            Wyra?? opini??
          </button>
        </div>
      )}
    </section>
  );
};

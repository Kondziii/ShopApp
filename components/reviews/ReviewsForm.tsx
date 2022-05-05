import React from 'react';
import { Input } from '../Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextArea } from '../TextArea';
import { apolloClient } from '../../graphql/graphqlClient';
import {
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  useCreateReviewMutation,
} from '../../generated/graphql';

const reviewSchema = yup
  .object({
    headline: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    content: yup.string().required(),
    rating: yup.string().required(),
  })
  .required();

type ReviewForm = yup.InferType<typeof reviewSchema>;

interface ProductReviewsProps {
  productId: string;
  slug: string;
}

export const ReviewsForm = ({ productId, slug }: ProductReviewsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ReviewForm>({
    resolver: yupResolver(reviewSchema),
  });

  const [createReview, { data, loading, error }] = useCreateReviewMutation({
    // refetchQueries: [
    //   {
    //     query: GetProductReviewsDocument,
    //     variables: {
    //       slug,
    //     },
    //   },
    // ],
    update(cache, result) {
      const originalData = cache.readQuery<GetProductReviewsQuery>({
        query: GetProductReviewsDocument,
        variables: {
          slug,
        },
      });

      if (!originalData || !originalData.product || !result.data?.review) {
        return;
      }

      const updatedData = {
        ...originalData,
        product: {
          ...originalData.product,
          reviews: [...originalData.product.reviews, result.data.review],
        },
      };
      console.log(updatedData);

      cache.writeQuery({
        query: GetProductReviewsDocument,
        variables: {
          slug,
        },
        data: updatedData,
      });
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await createReview({
      variables: {
        review: {
          headline: values.headline,
          name: values.name,
          email: values.email,
          content: values.content,
          rating: +values.rating,
          product: {
            connect: {
              id: productId,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: (-Math.random()).toString(),
          headline: values.headline,
          name: values.name,
          email: values.email,
          content: values.content,
          rating: +values.rating,
        },
      },
    });
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        headline: '',
        name: '',
        email: '',
        content: '',
        rating: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className='mt-4'>
      <form
        onSubmit={onSubmit}
        className='grid grid-cols-1 p-8 bg-white rounded-md shadow-md sm:grid-cols-12 gap-x-4 gap-y-2'
      >
        <Input
          {...register('name')}
          container_classes='sm:col-span-6'
          id='name'
          type='text'
          label='Your name'
          placeholder='Name...'
          autoComplete='name'
          error={errors.name}
        ></Input>
        <Input
          {...register('email')}
          container_classes='sm:col-span-6'
          id='email'
          type='email'
          label='Email'
          placeholder='Email...'
          autoComplete='email'
          error={errors.email}
        ></Input>
        <Input
          {...register('headline')}
          container_classes='sm:col-span-10'
          id='headline'
          type='text'
          label='Headline'
          placeholder='Headline...'
          error={errors.headline}
        ></Input>
        <Input
          {...register('rating')}
          container_classes='sm:col-span-2'
          id='rating'
          type='number'
          label='Rating'
          placeholder='Rating...'
          min={0}
          max={5}
          error={errors.rating}
        ></Input>

        <TextArea
          {...register('content')}
          container_classes='col-span-full'
          id='content'
          rows={4}
          label='Content'
          placeholder='Content...'
          error={errors.content}
        ></TextArea>
        <div className='mt-2 col-span-full'>
          <button
            type='submit'
            className='px-8 py-2 transition-all duration-300 border-2 rounded-full text-slate-700 border-slate-700 hover:text-white hover:bg-slate-700'
          >
            Publish
          </button>
        </div>
      </form>
      {loading && <div className='animate-bounce'>Publishing...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </section>
  );
};

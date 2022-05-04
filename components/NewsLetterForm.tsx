import React, { useEffect, useState } from 'react';
import { Input } from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddToNewsletterMutation } from '../hooks/useAddToNewsletterMutation';

const newsletterSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

type NewsLetterFormType = yup.InferType<typeof newsletterSchema>;

export const NewsLetterForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewsLetterFormType>({
    resolver: yupResolver(newsletterSchema),
  });

  const { mutate, isSuccess } = useAddToNewsletterMutation();

  const onSubmit = handleSubmit((values) => {
    mutate(values.email);
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ email: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setFeedback(true);
      setTimeout(() => {
        setFeedback(false);
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <section className='p-12 bg-yellow-200 sm:p-16 md:p-20'>
      <div className='relative w-full p-10 mx-auto bg-white rounded-md shadow-sm sm:w-3/4 md:w-1/2 sm:p-14 shadow-yellow-500'>
        <header>
          <h1 className='block mb-6 text-2xl font-bold tracking-wide text-center'>
            Subscribe to stay up to date with our offer!
          </h1>
        </header>
        <form onSubmit={onSubmit}>
          <Input
            container_classes=''
            type='email'
            {...register('email')}
            id='newsletter_email'
            autoComplete='email'
            placeholder='Your email...'
            error={errors.email}
          ></Input>
          <button
            className='block px-8 py-2 mx-auto mt-6 transition-all duration-300 border rounded-full border-slate-700 text-slate-700 hover:text-white hover:bg-slate-700'
            type='submit'
          >
            Confirm your subscription
          </button>
          <p className='mt-2 text-xs text-center text-gray-500'>
            By signing up to the newsletter, you agree on receiving from us the
            news, promotions and information about our products.
          </p>

          {feedback && (
            <p className='absolute bottom-0 left-0 w-full px-6 py-2 mt-4 text-center text-white bg-green-500 '>
              Sing up successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

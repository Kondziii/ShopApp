import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { NextAuthAction } from 'next-auth/lib/types';

const signInSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type SignInForm = yup.InferType<typeof signInSchema>;

const SignInPage = () => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const res: any = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: router.query.callbackUrl?.toString() || '/',
    });

    if (res && res?.status === 401) {
      setError('email', { message: 'Błędne dane logowania' });
      setError('password', { message: 'Błędne dane logowania' });
      setLoading(false);
      return;
    }

    router.replace(router.query.callbackUrl?.toString() || '/');
  });

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session.status === 'authenticated') {
    router.push('/');
    return null;
  }

  return (
    <div className='flex items-center justify-center flex-grow'>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-md p-10 bg-white shadow-md'
      >
        <h1 className='mb-4 text-2xl font-semibold'>Zaloguj</h1>
        <fieldset className='space-y-4'>
          <Input
            type='text'
            id='email'
            {...register('email')}
            label='Email'
            autoComplete='email'
            placeholder='Podaj email...'
            error={errors.email}
          />
          <Input
            type='password'
            id='password'
            placeholder='Podaj hasło...'
            autoComplete='password'
            {...register('password')}
            label='Hasło'
            error={errors.password}
          />
        </fieldset>
        <button
          type='submit'
          disabled={loading}
          className='block relative w-full px-4 py-2 mx-auto mt-6 text-white transition duration-300 border rounded-full bg-slate-700 border-slate-700 hover:bg-slate-800'
        >
          Zaloguj się
          {loading && (
            <span className='absolute right-4 top-1/2 -translate-y-1/2'>
              <ClipLoader color={'white'} loading={true} size={18} />
            </span>
          )}
        </button>
        <small className='block mt-1 text-center'>
          Nie masz jeszcze konta?{' '}
          <button
            onClick={() => router.push('/signup')}
            type='button'
            className='text-yellow-500 transition duration-300 hover:text-yellow-600'
          >
            Zarejestruj się
          </button>
        </small>
      </form>
    </div>
  );
};

export default SignInPage;

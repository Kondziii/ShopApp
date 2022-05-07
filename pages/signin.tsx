import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = handleSubmit((values) => {
    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: router.query.callbackUrl?.toString() || '/',
    });
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
        <h1 className='mb-4 text-2xl font-semibold'>Sign in</h1>
        <fieldset className='space-y-4'>
          <Input
            type='text'
            id='email'
            {...register('email')}
            label='Email'
            autoComplete='email'
            placeholder='Type email here...'
            error={errors.email}
          />
          <Input
            type='password'
            id='password'
            placeholder='Type password here...'
            autoComplete='password'
            {...register('password')}
            label='Password'
            error={errors.password}
          />
        </fieldset>
        <button
          type='submit'
          className='block w-full px-4 py-2 mx-auto mt-6 text-white transition duration-300 border rounded-full bg-slate-700 border-slate-700 hover:bg-slate-800'
        >
          Sign in
        </button>
        <small className='block mt-1 text-center'>
          Haven&apos;t got account yet?{' '}
          <button
            onClick={() => router.push('/signup')}
            type='button'
            className='text-yellow-500 transition duration-300 hover:text-yellow-600'
          >
            Sign up
          </button>
        </small>
      </form>
    </div>
  );
};

export default SignInPage;

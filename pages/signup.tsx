import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

const signupSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  })
  .required();

export type SignUpForm = yup.InferType<typeof signupSchema>;

const SignUpPage = () => {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SignUpForm>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
  });

  if (session.status === 'authenticated') {
    router.push('/');
    return null;
  }

  if (session.status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center flex-grow '>
      <form
        onSubmit={onSubmit}
        className='w-full max-w-md p-10 mx-auto bg-white rounded shadow-md'
      >
        <h1 className='mb-4 text-2xl font-semibold'>Register account</h1>
        <fieldset className='space-y-4'>
          <Input
            id='email'
            label='Email'
            type='text'
            placeholder='Type email here...'
            autoComplete='email'
            {...register('email')}
            error={errors.email}
          />
          <Input
            id='password'
            label='Password'
            type='password'
            placeholder='Type password here...'
            autoComplete='password'
            {...register('password')}
            error={errors.password}
          />
          <Input
            id='confirmPassword'
            label='Confirm password'
            type='password'
            placeholder='Confirm password here...'
            autoComplete='password'
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
        </fieldset>
        <button
          type='submit'
          className='block w-full px-4 py-2 mx-auto mt-8 text-white transition duration-300 border rounded-full bg-slate-700 border-slate-700 hover:bg-slate-800'
        >
          Sign up
        </button>
        <small className='block mt-1 text-center'>
          Already have an account?{' '}
          <button
            onClick={() =>
              router.push({
                pathname: '/signin',
              })
            }
            type='button'
            className='text-yellow-500 transition-colors duration-300 hover:text-yellow-600'
          >
            Sign in
          </button>
        </small>
      </form>
    </div>
  );
};

export default SignUpPage;

// export const getServerSideProps = async (ctx: InferGetServerSidePropsType<GetServerSideProps>) => {
//   const session = await getSession(ctx);
//   if (session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

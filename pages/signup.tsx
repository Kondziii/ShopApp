import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import yup from '../yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

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
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
    setError,
  } = useForm<SignUpForm>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    console.log(res.status === 400);

    if (res.status === 400) {
      setError('email', {
        message: 'Istnieje już konto powiązane z tym adresem email.',
      });
      setLoading(false);
      return;
    }

    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: router.query.callbackUrl?.toString() || '/',
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
        <h1 className='mb-4 text-2xl font-semibold'>Zarejestruj konto</h1>
        <fieldset className='space-y-4'>
          <Input
            id='email'
            label='Email'
            type='text'
            placeholder='Podaj email...'
            autoComplete='email'
            {...register('email')}
            error={errors.email}
          />
          <Input
            id='password'
            label='Hasło'
            type='password'
            placeholder='Podaj hasło...'
            autoComplete='password'
            {...register('password')}
            error={errors.password}
          />
          <Input
            id='confirmPassword'
            label='Potwierdź hasło'
            type='password'
            placeholder='Podaj hasło ponownie...'
            autoComplete='password'
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
        </fieldset>
        <button
          disabled={loading}
          type='submit'
          className='relative w-full px-4 py-2 mx-auto mt-8 text-white transition duration-300 border rounded-full bg-slate-700 border-slate-700 hover:bg-slate-800'
        >
          Zarejestruj
          {loading && (
            <span className='absolute right-4 top-1/2 -translate-y-1/2'>
              <ClipLoader color={'white'} loading={true} size={18} />
            </span>
          )}
        </button>
        <small className='block mt-1 text-center'>
          Masz już konto?{' '}
          <button
            onClick={() =>
              router.push({
                pathname: '/signin',
              })
            }
            type='button'
            className='text-yellow-500 transition-colors duration-300 hover:text-yellow-600'
          >
            Zaloguj się
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

import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../yup';

const checkoutSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

type CheckoutForm = yup.InferType<typeof checkoutSchema>;

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className='grid grid-cols-2 p-8'>
      <form onSubmit={onSubmit} className='grid grid-cols-2 gap-x-8 gap-y-3'>
        <Input
          {...register('firstName', { required: true })}
          type='text'
          id='firstName'
          autoComplete='name'
          label='Firstname'
          placeholder='Type firstname here...'
          error={errors.firstName}
          error_caption='Firstname field is required.'
        ></Input>

        <Input
          {...register('lastName', { required: true })}
          type='text'
          id='lastName'
          autoComplete='name'
          label='Lastname'
          placeholder='Type lastname here...'
          error={errors.lastName}
          error_caption='Lastname field is required.'
        ></Input>

        <Input
          container_classes='col-span-2'
          {...register('email', { required: true })}
          type='text'
          id='email'
          autoComplete='email'
          label='Email'
          placeholder='Type email here...'
          error={errors.email}
          error_caption='Email field is required.'
        ></Input>
        <button
          className='px-4 py-2 mx-auto transition-all duration-300 border rounded-full  border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'
          type='submit'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

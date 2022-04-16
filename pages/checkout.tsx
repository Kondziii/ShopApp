import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../yup';
import { Select } from '../components/Select';

const provinces = [
  'dolnośląskie',
  'kujawsko-pomorskie',
  'lubelskie',
  'lubuskie',
  'łódzkie',
  'małopolskie',
  'mazowieckie',
  'opolskie',
  'podkarpackie',
  'podlaskie',
  'pomorskie',
  'śląskie',
  'świętokrzyskie',
  'warmińsko-mazurskie',
  'wielkopolskie',
  'zachodniopomrskie',
];

const checkoutSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    homeNumber: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup
      .string()
      .required()
      .matches(
        new RegExp('[0-9]{2}-[0-9]{3}'),
        'Postal code has to fit XX-XXX pattern'
      ),
    cardNumber: yup
      .string()
      .matches(new RegExp('[0-9]{16}'), 'Card number has to contain 16 numbers')
      .required(),
    expiration: yup
      .string()
      .required()
      .matches(
        new RegExp('[0-9]{2}/[0-9]{2}'),
        'Expiration date has to be in format month/year'
      ),
    cvv: yup.string().required().min(3),
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
    <div className='box-border grid flex-grow h-full grid-cols-2 p-8 bg-white'>
      <form onSubmit={onSubmit} className='grid grid-cols-6 gap-x-8 gap-y-3'>
        <Input
          container_classes='col-span-3'
          {...register('firstName', { required: true })}
          type='text'
          id='firstName'
          autoComplete='name'
          label='Firstname'
          placeholder='Firstname...'
          error={errors.firstName}
        ></Input>

        <Input
          container_classes='col-span-3'
          {...register('lastName', { required: true })}
          type='text'
          id='lastName'
          autoComplete='name'
          label='Lastname'
          placeholder='Lastname...'
          error={errors.lastName}
        ></Input>

        <Input
          container_classes='col-span-full'
          {...register('email', { required: true })}
          type='text'
          id='email'
          autoComplete='email'
          label='Email'
          placeholder='Email...'
          error={errors.email}
        ></Input>

        <Input
          container_classes='col-span-3'
          {...register('city', { required: true })}
          type='text'
          id='city'
          autoComplete='street-address'
          label='City'
          placeholder='City...'
          error={errors.city}
        ></Input>

        <Input
          container_classes='col-span-3'
          {...register('street', { required: true })}
          type='text'
          id='street'
          autoComplete='street-address'
          label='Street'
          placeholder='Street...'
          error={errors.street}
        ></Input>

        <Input
          container_classes='col-span-2'
          {...register('homeNumber', { required: true })}
          type='number'
          id='homeNumber'
          autoComplete='street-address'
          label='Home number'
          placeholder='Home number...'
          error={errors.homeNumber}
        ></Input>

        <Input
          container_classes='col-span-2'
          {...register('postalCode')}
          type='text'
          id='postalCode'
          autoComplete='street-address'
          label='Postal code'
          placeholder='Postal code...'
          error={errors.postalCode}
        ></Input>

        <Select
          container_classes='col-span-2'
          items={provinces}
          {...register('province')}
          id='province'
          label='Province'
          placeholder='Province...'
          error={errors.province}
        />

        <Input
          container_classes='col-span-full'
          {...register('cardNumber')}
          type='text'
          id='cardNumber'
          autoComplete='cc-number'
          label='Card number'
          placeholder='Cart number...'
          error={errors.cardNumber}
        ></Input>

        <Input
          container_classes='col-span-3'
          {...register('cardNumber')}
          type='text'
          id='cardNumber'
          autoComplete='cc-number'
          label='Card number'
          placeholder='Cart number...'
          error={errors.cardNumber}
        ></Input>

        <Input
          container_classes='col-span-2'
          {...register('expiration')}
          type='text'
          id='expiration'
          autoComplete='cc-number'
          label='Expiration date'
          placeholder='Expiration date...'
          error={errors.expiration}
        ></Input>

        <div className='col-span-full'>
          <button
            className='px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;

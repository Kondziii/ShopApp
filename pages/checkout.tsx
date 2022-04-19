import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from '../yup';
import { Select } from '../components/Select';
import { InputGroup } from '../components/checkout/InputGroup';
import {
  AddressDetailsFields,
  CardDetailsFields,
  PersonalDetailsFields,
} from '../components/checkout/CheckoutFormFields';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';

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
    cardName: yup.string().required(),
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
    cvv: yup.string().required().min(3).max(3),
  })
  .required();

export type CheckoutForm = yup.InferType<typeof checkoutSchema>;

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log('siema');
    console.log(values);
  });

  return (
    <div className='grid grid-cols-12 bg-white'>
      <form
        onSubmit={onSubmit}
        className='p-8 space-y-4 col-span-full md:col-span-8'
      >
        <InputGroup<CheckoutForm>
          className='grid grid-cols-2 gap-x-4 gap-y-1'
          title='Personal Details'
          register={register}
          errors={errors}
          fields={PersonalDetailsFields}
        ></InputGroup>

        <InputGroup<CheckoutForm>
          className='grid grid-cols-6 gap-x-4 gap-y-1'
          title='Address'
          register={register}
          errors={errors}
          fields={AddressDetailsFields}
        ></InputGroup>

        <InputGroup<CheckoutForm>
          className='grid grid-cols-4 gap-x-4 gap-y-1'
          title='Card Details'
          register={register}
          errors={errors}
          fields={CardDetailsFields}
        ></InputGroup>
        <div className='mt-2 col-span-full'>
          <button
            className='px-4 py-2 mx-auto transition-all duration-300 border rounded-full border-slate-700 text-slate-700 w-fit hover:bg-slate-700 hover:text-white'
            type='submit'
          >
            Continue
          </button>
        </div>
      </form>
      <CheckoutSummary />
    </div>
  );
};

export default CheckoutPage;

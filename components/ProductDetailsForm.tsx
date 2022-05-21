import yup from '../yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import React, {
  ChangeEventHandler,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { ProductFullInfoType } from './ProductDetails';
import { AppRadio } from './AppRadio';

interface ProductDetailsFormProps extends HTMLAttributes<HTMLFormElement> {
  product: ProductFullInfoType;
  setSize?: Dispatch<SetStateAction<string>>;
}

const sizeFormSchema = yup
  .object({
    size: yup
      .string()
      .required('Konieczne jest wybranie odpowiedniego rozmiaru.'),
  })
  .required();

type sizeFormType = yup.InferType<typeof sizeFormSchema>;
export const ProductDetailsForm = ({
  product,
  setSize,
}: ProductDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<sizeFormType>({
    resolver: yupResolver(sizeFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  const handleChangeSize: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (setSize) {
      setSize(e.target.value);
    }

    //TODO ADD TO CART
  };

  return (
    <form onSubmit={onSubmit} className='my-4 mb-12 space-x-2'>
      <h2 className='mb-2'>Rozmiary</h2>
      {product.productSizeVariants.map((size) => {
        return (
          <>
            {size.amount > 0 && (
              <AppRadio
                id={size.size?.name}
                key={size.size?.name}
                label={size.size?.name}
                value={size.size?.name}
                inVisible
                {...register('size')}
                onChange={handleChangeSize}
              />
            )}
          </>
        );
      })}
      <small className='text-red-500 block'>{errors.size?.message}</small>
      <div className='mt-6'>
        <button
          type='submit'
          className='flex px-8 justify-center items-center  py-2  space-x-2 text-base transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-1 ring-slate-500'
        >
          <ShoppingCartIcon className='h-4' />
          <span>Dodaj do koszyka</span>
        </button>
      </div>
    </form>
  );
};

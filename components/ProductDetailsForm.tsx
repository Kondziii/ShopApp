import yup from '../yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShoppingCartIcon } from '@heroicons/react/solid';
import React, {
  ChangeEventHandler,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { ProductFullInfoType } from './ProductDetails';
import { AppRadio } from './AppRadio';
import { useCartState } from './cart/CartContext';
import { watch } from 'fs';
import { Input } from './Input';
import { toast } from 'react-toastify';

interface ProductDetailsFormProps extends HTMLAttributes<HTMLFormElement> {
  product: ProductFullInfoType;
  setSize: Dispatch<SetStateAction<string>>;
  currSize: string;
}

const sizeFormSchema = yup
  .object({
    size: yup
      .string()
      .required('Konieczne jest wybranie odpowiedniego rozmiaru.'),
    amount: yup.number().default(1).required().positive(),
  })
  .required();

type sizeFormType = yup.InferType<typeof sizeFormSchema>;
export const ProductDetailsForm = ({
  product,
  setSize,
  currSize,
}: ProductDetailsFormProps) => {
  const cartState = useCartState();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    setError,
    watch,
    getFieldState,
    getValues,
    clearErrors,
  } = useForm<sizeFormType>({
    resolver: yupResolver(sizeFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    cartState.addToCart({
      id: `${product.id}__${values.size}`,
      count: values.amount,
      price: product.price,
      size: values.size,
      slug: product.slug,
      thumbnailAlt: product.name,
      thumbnailSrc: product.images[0].url,
      title: product.name,
    });
    toast('Produkt został dodany do koszyka', {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  });

  const handleChangeSize = (value: string) => {
    setSize(value);
  };

  const availableAmount = () => {
    if (currSize !== '') {
      return product.productSizeVariants.find(
        (size) => size.size?.name === currSize
      )?.amount;
    }
    return product.productSizeVariants.reduce((prev, curr) => {
      const current = curr.amount;
      return prev + current;
    }, 0);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.size) {
        handleChangeSize(value.size);
      }
      const limit = availableAmount() || 1;
      if (value.amount && value.amount > limit) {
        console.log(availableAmount());
        setError('amount', {
          message: 'Liczba musi być mniejsza niż dostępna ilość',
        });
      } else {
        clearErrors('amount');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, currSize]);

  return (
    <form onSubmit={onSubmit} className='my-4 mb-12 '>
      <h2 className='mb-2'>Rozmiary</h2>
      <fieldset className='space-x-2'>
        {product.productSizeVariants.map((size, index) => {
          return (
            <span key={`${size.size?.name}_${index.toString()}`}>
              {size.amount > 0 && size.size?.name && (
                <AppRadio
                  id={`${size.size.name}_${index.toString()}`}
                  label={size.size.name}
                  value={size.size.name}
                  is_btn_visible={true}
                  {...register('size')}
                />
              )}
            </span>
          );
        })}
      </fieldset>
      <small className='block text-red-500'>{errors.size?.message}</small>
      <Input
        container_classes='w-fit max-w-[100px] mt-2'
        id='amount'
        label='Ilość'
        type='number'
        min={1}
        max={99}
        defaultValue={1}
        {...register('amount')}
        error={errors.amount}
      />
      <div className='mt-6'>
        <button
          type='submit'
          className='flex items-center justify-center px-8 py-2 space-x-2 text-base transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-1 ring-slate-500'
        >
          <ShoppingCartIcon className='h-4' />
          <span>Dodaj do koszyka</span>
        </button>
      </div>
    </form>
  );
};

import React from 'react';
import { ProductFullInfoType } from './ProductDetails';

interface ProductDetailsAmountProps {
  product: ProductFullInfoType;
  currSize: string;
}

export const ProductDetailsAmount = ({
  product,
  currSize,
}: ProductDetailsAmountProps) => {
  if (currSize !== '') {
    return (
      <p className='text-xs  text-gray-500'>
        Dostępna ilość:{' '}
        {
          product.productSizeVariants.find(
            (size) => size.size?.name === currSize
          )?.amount
        }
      </p>
    );
  }

  return (
    <p className='text-xs  text-gray-500'>
      Dostępna ilość:{' '}
      {product.productSizeVariants.reduce((prev, curr) => {
        const current = curr.amount;
        return prev + current;
      }, 0)}
    </p>
  );
};

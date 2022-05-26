import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AppSpinner } from '../../components/AppSpinner';
import { CartItemList } from '../../components/CartItemList';
import {
  GetOrderCartItemsByIdDocument,
  useGetOrderCartItemsByIdQuery,
} from '../../generated/graphql';

const OrderDetailsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(+(router.query.page || '1'));
  const { data, loading } = useGetOrderCartItemsByIdQuery({
    query: GetOrderCartItemsByIdDocument,
    variables: {
      id: router.query.id?.toString() || '',
      first: 10,
      skip: (currentPage - 1) * 10,
    },
  });

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <button
        className='px-4 py-2 my-2 rounded-lg hover:bg-yellow-100 '
        onClick={() => router.back()}
      >
        &larr;Wróć do listy
      </button>
      {loading && <AppSpinner />}
      {data && data.order && data.order.cartItems && (
        <CartItemList
          product={data.order.cartItems.map((item) => {
            return {
              id: item.id,
              price: item.price,
              amount: item.amount,
              size: item.size,
              slug: item.product!.slug,
              image: item.product!.images[0].url,
              name: item.product!.name,
            };
          })}
        />
      )}
    </div>
  );
};

export default OrderDetailsPage;

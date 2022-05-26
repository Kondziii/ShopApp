import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { AppCheckboxGroup, CheckboxItem } from '../components/AppCheckboxGroup';
import { AppSpinner } from '../components/AppSpinner';
import { Pagination } from '../components/Pagination';
import { formatPrice } from '../components/utils/functions';
import {
  GetAccountOrdersDocument,
  GetOrderStagesDocument,
  GetOrderStagesQuery,
  OrderStage,
  useGetAccountOrdersQuery,
  useGetOrderStagesQuery,
} from '../generated/graphql';

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const [filterOptions, setFilterOptions] = useState<CheckboxItem[]>([]);
  const orderStages = useGetOrderStagesQuery({
    query: GetOrderStagesDocument,
    onCompleted: (data) => {
      console.log(data);
      if (data && data.__type && data.__type.enumValues) {
        setFilterOptions(
          data.__type.enumValues.map((el) => {
            return {
              title: el.name,
              value: el.name,
              checked: false,
            };
          })
        );
      }
    },
  });

  const router = useRouter();
  const columns = useMemo(
    () => [
      'Numer zamówienia',
      'Data złożenia zamówienia',
      'Zapłacona kwota',
      'Status',
    ],
    []
  );
  const { data, loading, refetch } = useGetAccountOrdersQuery({
    query: GetAccountOrdersDocument,
    variables: {
      email: session.data?.user.email || '',
      first: 10,
      skip: router.query.page ? (currentPage - 1) * 10 : 0,
      stage: filterOptions.every((el) => el.checked === false)
        ? (filterOptions.map((el) => el.title) as OrderStage[]) || []
        : (filterOptions
            .map((el) => (el.checked === true ? el.title : ''))
            .filter((el) => el !== '') as OrderStage[]) || [],
    },
  });

  if (session.status === 'unauthenticated') {
    router.replace('/');
    return null;
  }

  const handleFetchMore = (page: number) => {
    setCurrentPage(page);
    router.push(`/orders?page=${page}`);
  };

  return (
    <div className=''>
      <div className='mx-auto mt-4 w-fit'>
        <AppCheckboxGroup
          items={filterOptions}
          setItems={setFilterOptions}
          flat
        />

        {!loading && (
          <table className='p-4 mt-2 overflow-x-auto bg-white rounded shadow table-fixed'>
            <thead className='border-b border-b-slate-200'>
              <tr>
                {columns.map((el) => {
                  return (
                    <th
                      className='px-4 py-6 text-xs tracking-widest uppercase text-stone-500 '
                      key={el}
                    >
                      {el}
                    </th>
                  );
                })}
              </tr>
            </thead>
            {data && (
              <tbody className='divide-y'>
                {data?.orders.map((item) => {
                  return (
                    <Link key={item.id} href={`/orders/${item.id}`} passHref>
                      <tr className='table-row text-center transition duration-300 cursor-pointer hover:bg-yellow-100'>
                        <td className='table-cell w-1/4 px-4 py-2'>
                          {item.id}
                        </td>
                        <td className='table-cell w-1/4 px-4 py-2'>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className='table-cell w-1/4 px-4 py-2'>
                          {item.total > 10000
                            ? formatPrice(item.total)
                            : formatPrice(item.total + 2500)}{' '}
                          zł
                        </td>
                        <td className='table-cell w-1/4 px-4 py-2'>
                          {item.orderStage}
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            )}
            {data?.orders.length === 0 && !loading && (
              <tbody>
                <tr>
                  <td className='py-4 text-center text-gray-500' colSpan={4}>
                    Nie masz zamówień w takim stanie.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        )}

        {loading && <AppSpinner />}

        <Pagination
          firstPage={1}
          currentPage={currentPage}
          lastPage={
            data?.ordersConnection.aggregate.count
              ? Math.ceil(data?.ordersConnection.aggregate.count / 10)
              : 1
          }
          onSelected={handleFetchMore}
        />
      </div>
    </div>
  );
};

export default OrdersPage;

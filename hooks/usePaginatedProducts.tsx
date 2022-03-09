import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../service/products';

export const usePaginatedProducts = () => {
  const router = useRouter();
  const [page, setPage] = useState(() => {
    if (router && typeof router.query.page === 'string')
      return parseInt(router?.query.page);
    else return 1;
  });

  const result = useQuery(['products', { page: page }], () => {
    return fetchProducts(page);
  });

  const fetchPage = useCallback(
    (page: number) => {
      router.push(`/pagination1/?page=${page}`);
    },
    [router]
  );

  useEffect(() => {
    if (router && typeof router.query.page === 'string') {
      setPage(parseInt(router?.query.page || ''));
    }
  }, [router]);

  return {
    ...result,
    page,
    fetchPage,
  };
};

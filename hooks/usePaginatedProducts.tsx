import type { ApiProducts } from '../types';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const fetchProducts = async (offset: number = 0) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/?take=25&offset=${offset}`
  );
  const data: ApiProducts[] = await response.json();
  return data;
};

export const usePaginatedProducts = () => {
  const router = useRouter();
  const [page, setPage] = useState(() => {
    if (router && typeof router.query.page === 'string')
      return parseInt(router?.query.page);
    else return undefined;
  });

  const result = useQuery(['products', { page: page }], () => {
    if (page) return fetchProducts(page * 25);
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

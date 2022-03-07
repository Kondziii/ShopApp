import type { ApiProducts } from '../types';

export const fetchProducts = async (page: number = 1) => {
  const offset = (page - 1) * 25;

  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/?take=25&offset=${offset}`
  );
  const data: ApiProducts[] = await response.json();
  return data;
};

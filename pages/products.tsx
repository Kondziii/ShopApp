import { InferGetStaticPropsType } from 'next';

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <div>{data[0].title}</div>;
};

export default ProductsPage;

export const getStaticProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data: ProductsApiResponse[] = await response.json();

  return {
    props: {
      data,
    },
  };
};

export interface ProductsApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

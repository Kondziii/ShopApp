import { InferGetStaticPropsType } from 'next';
import { Product } from '../components/Product';

const ProductsPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <ul className='grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <li key={product.id}>
            <Product
              data={{
                id: product.id,
                title: product.title,
                description: product.description,
                thumbnailSrc: product.image,
                thumbnailAlt: product.title,
                rating: product.rating.rate,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data: ProductsApiResponse[] = await response.json();

  return {
    props: {
      products: data,
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

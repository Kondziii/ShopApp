import { InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../components/ProductListItem';
import { ApiProducts } from '../types';

const ProductsPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <ul className='grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <li key={product.id}>
            <ProductListItem
              data={{
                id: product.id,
                title: product.title,
                thumbnailSrc: product.image,
                thumbnailAlt: product.title,
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
  const response = await fetch('https://naszsklep-api.vercel.app/api/products');
  const data: ApiProducts[] = await response.json();

  return {
    props: {
      products: data,
    },
  };
};

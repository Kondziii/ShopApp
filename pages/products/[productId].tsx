import { InferGetStaticPropsType } from 'next';
import ProductDetails from '../../components/ProductDetails';
import { ProductsApiResponse } from '../products';

const ProductDetailsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return (
      <div>
        <p>Something went wrong!</p>
      </div>
    );
  }

  return (
    <>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          description: data.description,
          thumbnailSrc: data.image,
          thumbnailAlt: data.title,
          rating: data.rating.rate,
        }}
      ></ProductDetails>
    </>
  );
};

export default ProductDetailsPage;

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data: ProductsApiResponse[] = await response.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const response = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: ProductsApiResponse = await response.json();

  return {
    props: {
      data,
    },
  };
};

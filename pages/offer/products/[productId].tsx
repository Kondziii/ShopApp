import { InferGetStaticPropsType } from 'next';
import ProductDetails from '../../../components/ProductDetails';
import type { ApiProducts } from '../../../types';
import { NextSeo } from 'next-seo';

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
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`http://https://shop-app-blue.vercel.app/offer/products/${data.id}`}
        openGraph={{
          url: `http://https://shop-app-blue.vercel.app/offer/products/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              alt: data.title,
              type: 'image/jpeg',
            },
          ],
          site_name: 'ShopApp',
        }}
      ></NextSeo>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          thumbnailSrc: data.image,
          thumbnailAlt: data.title,
          rating: data.rating.rate,
          longDescription: data.longDescription,
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
  const response = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: ApiProducts[] = await response.json();

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
    `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  );
  const data: ApiProducts = await response.json();

  return {
    props: {
      data,
    },
  };
};

import { InferGetStaticPropsType } from 'next';
import ProductDetails from '../../../components/ProductDetails';
// import type { ApiProducts } from '../../../types';
import { NextSeo } from 'next-seo';
import { serialize } from 'next-mdx-remote/serialize';
import { apolloClient } from '../../../graphql/graphqlClient';
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductSlugsDocument,
  GetProductSlugsQuery,
} from '../../../generated/graphql';

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
    <div>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`http://https://shop-app-blue.vercel.app/offer/products/${data.id}`}
        openGraph={{
          url: `http://https://shop-app-blue.vercel.app/offer/products/${data.id}`,
          title: data.name,
          description: data.description,
          images: [
            {
              url: data.images[0].url,
              alt: data.name,
              type: 'image/jpeg',
            },
          ],
          site_name: 'ShopApp',
        }}
      ></NextSeo>
      <ProductDetails product={data}></ProductDetails>
    </div>
  );
};

export default ProductDetailsPage;

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  // const response = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  // const data: ApiProducts[] = await response.json();
  const data = await apolloClient.query<GetProductSlugsQuery>({
    query: GetProductSlugsDocument,
  });

  return {
    paths: data.data.products.map((product) => {
      return {
        params: {
          slug: product.slug,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }
  // const response = await fetch(
  //   `https://naszsklep-api.vercel.app/api/products/${params.productId}`
  // );
  // const data: ApiProducts = await response.json();
  const data = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    query: GetProductDetailsBySlugDocument,
    variables: {
      slug: params.slug,
    },
  });

  if (!data || !data.data || !data.data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.data.product,
        longDescription: await serialize(data.data.product.description),
      },
    },
    revalidate: 2,
  };
};

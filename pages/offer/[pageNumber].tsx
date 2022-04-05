import { fetchProducts } from '../../service/products';
import { InferGetStaticPropsType } from 'next';
import { InferGetStaticPaths } from './products/[productId]';
import { ProductListItem } from '../../components/ProductListItem';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Pagination } from '../../components/Pagination';
import { apolloClient } from '../../graphql/graphqlClient';
import {
  GetAllProductsListDocument,
  GetAllProductsListQuery,
} from '../../generated/graphql';
import { Layout } from '../../components/Layout';

const PaginationPage = ({
  data,
  pageNumber,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const handleSelectedPage = useCallback(
    (page) => {
      router.push(`/offer/${page}`);
    },
    [router]
  );

  return (
    <div className='flex flex-col w-full p-8'>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {data?.map((product) => {
          return (
            <ProductListItem
              key={product.id}
              data={{
                id: product.id,
                slug: product.slug,
                title: product.name,
                price: product.price,
                thumbnailSrc: product.images[0].url,
                thumbnailAlt: product.name,
              }}
            />
          );
        })}
      </ul>
      {data && data.length > 20 && (
        <Pagination
          className='mt-12'
          firstPage={1}
          lastPage={150}
          currentPage={+pageNumber}
          take={20}
          onSelected={handleSelectedPage}
        />
      )}
    </div>
  );
};

export default PaginationPage;

export const getStaticPaths = async () => {
  const pagesNumber = Array.from({ length: 10 }, (_, i) => i + 1);

  return {
    paths: pagesNumber.map((pageNumber) => ({
      params: {
        pageNumber: pageNumber.toString(),
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  // const data = await fetchProducts(parseInt(params?.pageNumber || '1'));
  const data = await apolloClient.query<GetAllProductsListQuery>({
    query: GetAllProductsListDocument,
  });

  return {
    props: {
      data: data.data.products,
      pageNumber: params!.pageNumber,
    },
  };
};

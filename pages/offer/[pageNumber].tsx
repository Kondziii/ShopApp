import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ProductListItem } from '../../components/ProductListItem';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Pagination } from '../../components/Pagination';
import { apolloClient } from '../../graphql/graphqlClient';
import {
  GetAllProductsDocument,
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from '../../generated/graphql';

const PaginationPage = ({
  pagination,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const handleSelectedPage = useCallback(
    (page) => {
      router.push(`/offer/${page}`);
    },
    [router]
  );

  if (!products) {
    return <div>Brak produktów</div>;
  }

  return (
    <div className='flex flex-col w-full p-8'>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {products?.map((product) => {
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
      <Pagination
        firstPage={1}
        lastPage={pagination.total}
        currentPage={pagination.currPage}
        onSelected={handleSelectedPage}
      />
    </div>
  );
};

export default PaginationPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log(ctx.query);
  const { pageNumber } = ctx.query;
  const first = 5;
  const skip = pageNumber ? (+pageNumber - 1) * first : 0;

  const response = await apolloClient.query<
    GetAllProductsQuery,
    GetAllProductsQueryVariables
  >({
    query: GetAllProductsDocument,
    variables: {
      first,
      skip,
    },
  });

  return {
    props: {
      products: response.data.products,
      pagination: {
        total: Math.ceil(response.data.totalCount.aggregate.count / first),
        currPage: pageNumber ? +pageNumber : 1,
      },
    },
  };
};

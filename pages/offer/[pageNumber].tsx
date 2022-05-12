import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ProductListItem } from '../../components/ProductListItem';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { apolloClient } from '../../graphql/graphqlClient';
import {
  GetAllProductsDocument,
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  GetAllProductsWithCategoryDocument,
  GetAllProductsWithCategoryQuery,
  GetAllProductsWithCategoryQueryVariables,
  InputMaybe,
  Sex,
} from '../../generated/graphql';
import { ProductFilterSection } from '../../components/ProductFilterSection';
import { useFilterState } from '../../components/FilterContext';
import { NoProducts } from '../../components/NoProducts';

const PaginationPage = ({
  pagination,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(router.query.pageNumber || 1);
  const filterState = useFilterState();

  useEffect(() => {
    if (router.pathname.includes('/offer')) {
      filterState.resetFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    const filters = [];

    if (filterState.searchValue) {
      filters.push(`s=${filterState.searchValue}`);
    }

    if (filterState.sexFilterOptions.some((item) => item.checked === true)) {
      filters.push(
        `sex=${filterState.sexFilterOptions
          .filter((item) => item.checked === true)
          .map((item) => item.value)}`
      );
    }

    if (
      filterState.categoryFilterOptions.some((item) => item.checked === true)
    ) {
      filters.push(
        `category=${filterState.categoryFilterOptions
          .filter((item) => item.checked === true)
          .map((item) => item.value)}`
      );
    }

    router.push(`/offer/${pageNumber}?${filters.join('&')}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageNumber,
    filterState.searchValue,
    filterState.sexFilterOptions,
    filterState.categoryFilterOptions,
  ]);

  useEffect(() => {
    setPageNumber(1);
  }, [filterState.searchValue, filterState.sexFilterOptions]);

  const handleSelectedPage = (page: number) => setPageNumber(page);

  return (
    <div className='grid grid-cols-12 gap-4 p-6 '>
      <ProductFilterSection />
      {products.length !== 0 && (
        <section className='col-span-9'>
          <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
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
        </section>
      )}
      {products.length === 0 && (
        <NoProducts
          message='Niestety aktualnie nie mamy w ofercie produktów spełniających twoje
          kryteria wyszukiwania.'
        ></NoProducts>
      )}
    </div>
  );
};

export default PaginationPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { pageNumber, s, sex, category } = ctx.query;
  const first = 5;
  const skip = pageNumber ? (+pageNumber - 1) * first : 0;

  let sexOptions = typeof sex === 'string' ? sex.split(',') : sex;
  let categoryOptions =
    typeof category === 'string' ? category.split(',') : category;

  let response;

  if (!category) {
    response = await apolloClient.query<
      GetAllProductsQuery,
      GetAllProductsQueryVariables
    >({
      query: GetAllProductsDocument,
      variables: {
        first,
        skip,
        s: s?.toString() || '',
        sex: sexOptions as InputMaybe<Sex | Sex[]>,
      },
    });
  } else {
    response = await apolloClient.query<
      GetAllProductsWithCategoryQuery,
      GetAllProductsWithCategoryQueryVariables
    >({
      query: GetAllProductsWithCategoryDocument,
      variables: {
        first,
        skip,
        s: s?.toString() || '',
        sex: sexOptions as InputMaybe<Sex | Sex[]>,
        category: categoryOptions,
      },
    });
  }

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

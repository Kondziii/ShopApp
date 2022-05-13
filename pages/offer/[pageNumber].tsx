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
import { AdjustmentsIcon } from '@heroicons/react/outline';
import AppModal from '../../components/AppModal';

const PaginationPage = ({
  pagination,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(router.query.pageNumber || 1);
  const filterState = useFilterState();

  useEffect(() => {
    return () => {
      filterState.resetFilters();
    };
  }, []);

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

    if (
      filterState.priceFilters &&
      filterState.priceFilters.join() !== filterState.priceRange.join()
    ) {
      filters.push(
        `min=${filterState.priceFilters[0]}&max=${filterState.priceFilters[1]}`
      );
    }

    router.replace(`/offer/${pageNumber}?${filters.join('&')}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageNumber,
    filterState.searchValue,
    filterState.sexFilterOptions,
    filterState.categoryFilterOptions,
    filterState.priceFilters,
  ]);

  useEffect(() => {
    setPageNumber(router.query.pageNumber || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState.searchValue, filterState.sexFilterOptions]);

  const handleSelectedPage = (page: number) => setPageNumber(page);

  return (
    <div className='gap-4 p-6 sm:flex '>
      {/* Filter bar according to device size */}
      <div className='hidden sm:block'>
        <ProductFilterSection />
      </div>
      <div className='mb-4 sm:hidden'>
        <AppModal
          btnCaption='Filtruj'
          leftIcon={<AdjustmentsIcon className='inline h-5 mr-1' />}
          title=''
          isVisible={false}
        >
          <ProductFilterSection />
        </AppModal>
      </div>

      {products.length !== 0 && (
        <section className='flex-grow'>
          <ul className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
  const { pageNumber, s, sex, category, min, max } = ctx.query;
  const first = 5;
  const skip = pageNumber ? (+pageNumber - 1) * first : 0;

  let sexOptions = typeof sex === 'string' ? sex.split(',') : sex;
  let categoryOptions =
    typeof category === 'string' ? category.split(',') : category;

  let response;

  const minThreshold = min ? +min : -1;
  const maxThreshold = max ? +max : 9999999;

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
        min: minThreshold,
        max: maxThreshold,
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
        min: minThreshold,
        max: maxThreshold,
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

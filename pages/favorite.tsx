import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AppCheckboxGroup } from '../components/AppCheckboxGroup';
import { AppSpinner } from '../components/AppSpinner';
import { EmptyList } from '../components/cart/EmptyList';
import { useFilterState } from '../components/FilterContext';
import { Pagination } from '../components/Pagination';
import { ProductListItem } from '../components/ProductListItem';
import { useUserState } from '../components/UserContext';
import {
  useGetAccountFavoriteItemsByIdQuery,
  GetAccountFavoriteItemsByIdDocument,
  ProductItemFragment,
  useGetAccountFavoriteItemsByIdWithCategoryQuery,
  GetAccountFavoriteItemsByIdWithCategoryDocument,
} from '../generated/graphql';

const FavoritePage = () => {
  const filterState = useFilterState();
  const userState = useUserState();
  const session = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    +(router.query.page || 1) || 1
  );
  const [count, setCount] = useState(0);
  const [countCategory, setCountCategory] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmptyCategory, setIsEmptyCategory] = useState(false);

  const { refetch, data, loading, error, fetchMore } =
    useGetAccountFavoriteItemsByIdQuery({
      query: GetAccountFavoriteItemsByIdDocument,
      variables: {
        favorite: userState.favorites.map((el) => el.id),
        first: 12,
        skip: router.query.page ? (currentPage - 1) * 12 : 0,
      },
      onCompleted(data) {
        setCount(Math.ceil(data.pagination.aggregate.count / 12));
        if (data.products.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
      },
    });

  const {
    refetch: queryWithCategoryRefetch,
    fetchMore: queryWithCategoryFetchMore,
    loading: queryWithCategoryLoading,
    data: dataCategory,
  } = useGetAccountFavoriteItemsByIdWithCategoryQuery({
    query: GetAccountFavoriteItemsByIdWithCategoryDocument,
    variables: {
      favorite: userState.favorites.map((el) => el.id),
      category: filterState.categoryFilterOptions
        .filter((el) => el.checked)
        .map((el) => el.title),
      first: 12,
      skip: router.query.page ? (currentPage - 1) * 12 : 0,
    },
    onCompleted(data) {
      setCountCategory(Math.ceil(data.pagination.aggregate.count / 12));
      if (data.products.length === 0) {
        setIsEmptyCategory(true);
      } else {
        setIsEmptyCategory(false);
      }
    },
  });

  useEffect(() => {
    if (filterState.categoryFilterOptions.some((el) => el.checked)) {
      queryWithCategoryRefetch();
    }
  }, [filterState.categoryFilterOptions]);

  useEffect(() => {
    if (filterState.categoryFilterOptions.some((el) => el.checked)) {
      queryWithCategoryFetchMore({
        variables: {
          first: 12,
          skip: router.query.page ? (currentPage - 1) * 12 : 0,
        },
      });
    } else {
      fetchMore({
        variables: {
          first: 12,
          skip: router.query.page ? (currentPage - 1) * 12 : 0,
        },
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (
      data?.products.length === 0 &&
      userState.favorites.length !== 0 &&
      router.query.page &&
      +router.query.page > 1
    ) {
      setCurrentPage((prev) => --prev);
      router.push(`/favorite?page=${currentPage - 1}`);
    }
  }, [userState.favorites, router.query.page]);

  if (session.status === 'unauthenticated') {
    return null;
  }

  if (isEmpty && !loading) {
    return (
      <div className='flex items-center h-[65vh]'>
        <EmptyList
          title='Twoja lista polubionych produktów jest pusta'
          description='Zapoznaj się z naszą ofertą i dodaj wybrane produkty do ulubionych.'
          to='/offer'
          linkCaption='Przejdź do oferty'
        />
      </div>
    );
  }

  const handleSelectedPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/favorite?page=${page}`);
  };

  return (
    <section className='flex-grow p-8'>
      <AppCheckboxGroup
        items={filterState.categoryFilterOptions}
        setItems={filterState.setCategoryFilterOptions}
        flat
      />
      {loading ||
        (queryWithCategoryLoading && (
          <section className='flex items-center justify-center flex-grow h-[30vh]'>
            <AppSpinner />
          </section>
        ))}

      {filterState.categoryFilterOptions.some((el) => el.checked) &&
        isEmptyCategory &&
        !queryWithCategoryLoading && (
          <div className='flex items-center h-[35vh]'>
            <EmptyList
              title='Nie masz żadnych produktów spełniających kryteria wyszukiwania.'
              description='Zapoznaj się z naszą ofertą i dodaj wybrane produkty do ulubionych.'
              to='/offer'
              linkCaption='Przejdź do oferty'
            />
          </div>
        )}

      <ul className='grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {!filterState.categoryFilterOptions.some((el) => el.checked) &&
          data?.products.map((product) => {
            return (
              <ProductListItem
                key={product.id}
                data={{
                  id: product.id,
                  slug: product.slug,
                  title: product.name,
                  price: product.price,
                  thumbnailSrc: product?.images[0].url,
                  thumbnailAlt: product.name,
                  discount: product.discount,
                  sex: product.sex,
                  rating: product.rating,
                  ratingCount: product.ratingCount,
                }}
              />
            );
          })}
        {filterState.categoryFilterOptions.some((el) => el.checked) &&
          dataCategory?.products.map((product) => {
            return (
              <ProductListItem
                key={product.id}
                data={{
                  id: product.id,
                  slug: product.slug,
                  title: product.name,
                  price: product.price,
                  thumbnailSrc: product?.images[0].url,
                  thumbnailAlt: product.name,
                  discount: product.discount,
                  sex: product.sex,
                  rating: product.rating,
                  ratingCount: product.ratingCount,
                }}
              />
            );
          })}
      </ul>
      <Pagination
        firstPage={1}
        lastPage={
          filterState.categoryFilterOptions.some((el) => el.checked)
            ? countCategory
            : count
        }
        currentPage={currentPage}
        onSelected={handleSelectedPage}
      />
    </section>
  );
};

export default FavoritePage;

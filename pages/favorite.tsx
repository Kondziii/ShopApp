import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { EmptyList } from '../components/cart/EmptyList';
import { ProductListItem } from '../components/ProductListItem';
import { useUserState } from '../components/UserContext';
import {
  GetAccountFavoriteItemsByEmailDocument,
  GetAccountFavoriteItemsByEmailQuery,
  GetAccountFavoriteItemsByEmailQueryVariables,
} from '../generated/graphql';
import { apolloClient } from '../graphql/graphqlClient';

const FavoritePage = ({
  favorite,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const userState = useUserState();

  if (!favorite || favorite?.length === 0) {
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

  return (
    <ul className='grid gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {favorite?.map((product) => {
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
  );
};

export default FavoritePage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      props: {},
      redirect: '/',
      permanent: true,
    };
  }

  const data = await apolloClient.query<
    GetAccountFavoriteItemsByEmailQuery,
    GetAccountFavoriteItemsByEmailQueryVariables
  >({
    query: GetAccountFavoriteItemsByEmailDocument,
    variables: {
      email: session!.user.email,
    },
  });

  return {
    props: {
      favorite: data.data.account?.favorites,
    },
  };
};

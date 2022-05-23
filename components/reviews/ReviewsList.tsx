import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import {
  FullProductItemFragment,
  GetProductReviewsDocument,
  useGetProductReviewsQuery,
} from '../../generated/graphql';
import { AppSpinner } from '../AppSpinner';
import { ReviewsListItem } from './ReviewsListItem';

interface ReviewsListProps {
  product: FullProductItemFragment;
}

export const ReviewsList = ({ product }: ReviewsListProps) => {
  const [skip, setSkip] = useState<number>(0);
  const { data, loading, error, fetchMore } = useGetProductReviewsQuery({
    variables: {
      slug: product.slug,
      first: 10,
      skip: skip,
    },
  });

  const handleFetchMore = async () => {
    console.log('more');
    setSkip((prev) => prev + 10);
    fetchMore({
      variables: {
        skip: skip,
      },
    });
  };

  if (!data?.product || data?.product?.reviews.length === 0) {
    return (
      <div className='bg-white shadow rounded h-[15vh] flex items-center justify-center mt-4 text-gray-500'>
        Produkt nie posiada jeszcze żadnych recenzji.
      </div>
    );
  }

  return (
    <>
      <h3 className='my-2 text-sm '>Opinie: {product.ratingCount}</h3>
      {!loading && (
        <InfiniteScroll
          dataLength={data.reviewsConnection.aggregate.count}
          hasMore={
            data.product.reviews.length < data.reviewsConnection.aggregate.count
          }
          loader={<AppSpinner />}
          next={handleFetchMore}
          endMessage={
            <p className='text-center'>
              <b className='text-sm font-normal text-gray-500'>
                Ten produkt nie posiada więcej recenzji.
              </b>
            </p>
          }
        >
          <ul className='p-8 mx-auto my-4 bg-white divide-y-2 rounded-md shadow-lg '>
            {data.product.reviews.map((review, index) => {
              return (
                <ReviewsListItem key={`review.id${index}`} review={review} />
              );
            })}
          </ul>
        </InfiniteScroll>
      )}
      {loading && <AppSpinner />}
    </>
  );
};

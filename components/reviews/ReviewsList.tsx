import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from 'react-spinners';
import {
  FullProductItemFragment,
  useGetProductReviewsQuery,
} from '../../generated/graphql';
import { AppSpinner } from '../AppSpinner';
import { ReviewsListItem } from './ReviewsListItem';

interface ReviewsListProps {
  product: FullProductItemFragment;
}

export const ReviewsList = ({ product }: ReviewsListProps) => {
  const { data, loading, error } = useGetProductReviewsQuery({
    variables: {
      slug: product.slug,
    },
  });

  const handleFetchMore = () => {
    console.log('more');
  };

  if (!data?.product) {
    return <div>There is no reviews</div>;
  }

  return (
    <>
      <h3 className='my-2 text-sm '>Opinie: {product.ratingCount}</h3>
      {!loading && (
        <InfiniteScroll
          dataLength={product.ratingCount}
          hasMore={data.product.reviews.length === product.ratingCount}
          loader={<AppSpinner />}
          next={handleFetchMore}
        >
          <ul className='p-8 mx-auto my-4 bg-white divide-y-2 rounded-md shadow-lg '>
            {data.product.reviews.map((review) => {
              return <ReviewsListItem key={review.id} review={review} />;
            })}
          </ul>
        </InfiniteScroll>
      )}
      {loading && <AppSpinner />}
    </>
  );
};

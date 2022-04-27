import { useGetProductReviewsQuery } from '../../generated/graphql';
import { ReviewsListItem } from './ReviewsListItem';

interface ReviewsListProps {
  slug: string;
}

export const ReviewsList = ({ slug }: ReviewsListProps) => {
  const { data, loading, error } = useGetProductReviewsQuery({
    variables: {
      slug: slug,
    },
  });

  if (!data?.product) {
    return <div>There is no reviews</div>;
  }

  return (
    <ul className='p-8 mx-auto my-4 bg-white divide-y-2 rounded-md shadow-lg '>
      {data.product.reviews.map((review) => {
        return <ReviewsListItem key={review.id} review={review} />;
      })}
    </ul>
  );
};

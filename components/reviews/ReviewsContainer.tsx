import { ReviewsForm } from './ReviewsForm';
import { ReviewsList } from './ReviewsList';

interface ReviewsContainerProps {
  id: string;
  slug: string;
}

export const ReviewsContainer = ({ id, slug }: ReviewsContainerProps) => {
  return (
    <div>
      <ReviewsForm productId={id} slug={slug} />
      <ReviewsList slug={slug} />
    </div>
  );
};

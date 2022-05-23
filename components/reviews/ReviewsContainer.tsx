import { ProductFullInfoType } from '../ProductDetails';
import { ReviewsForm } from './ReviewsForm';
import { ReviewsList } from './ReviewsList';

interface ReviewsContainerProps {
  product: ProductFullInfoType;
}

export const ReviewsContainer = ({ product }: ReviewsContainerProps) => {
  return (
    <div>
      <ReviewsForm product={product} />
      <ReviewsList product={product} />
    </div>
  );
};

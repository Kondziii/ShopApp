import { Rating } from 'react-simple-star-rating';
import { ReviewContentFragment } from '../../generated/graphql';

interface ReviewsListItemProps {
  review: ReviewContentFragment;
}

export const ReviewsListItem = ({ review }: ReviewsListItemProps) => {
  const isOptimistic = review.id.startsWith('-');

  return (
    <li className={`relative block p-4 pb-8 ${isOptimistic && 'opacity-50'}`}>
      <div className='items-center justify-between block sm:flex'>
        <h3 className='text-2xl font-bolder'>{review.headline}</h3>
        <Rating
          ratingValue={review.rating * 20}
          readonly
          size={20}
          allowHalfIcon
          className='transform '
        />
      </div>
      <p className='mt-1 font-light text-gray-600 text-md'>{review.content}</p>
      <footer className='absolute bottom-0 left-4 '>
        <p className='text-sm text-gray-500 '>
          Recenzja opublikowana przez:{' '}
          <span className='text-black'>{review.email}</span>
        </p>
      </footer>
    </li>
  );
};

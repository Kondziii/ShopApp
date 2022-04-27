import { ReviewContentFragment } from '../../generated/graphql';

interface ReviewsListItemProps {
  review: ReviewContentFragment;
}

export const ReviewsListItem = ({ review }: ReviewsListItemProps) => {
  return (
    <li className='relative block p-4 pb-8'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-bolder'>{review.headline}</h3>
        {review.rating && (
          <span className='text-2xl'>
            <b className='mr-1 underline underline-offset-2'>{review.rating}</b>
            /5
          </span>
        )}
      </div>
      <p className='mt-1 font-light text-gray-600 text-md'>{review.content}</p>
      <footer className='absolute bottom-0 left-4 '>
        <p className='text-sm text-gray-500 '>
          Review added by <span>{review.name}</span>
        </p>
      </footer>
    </li>
  );
};

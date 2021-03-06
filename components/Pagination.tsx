import {
  usePaginationRange,
  usePaginationProps,
} from '../hooks/usePaginationRange';

interface PaginationProps
  extends usePaginationProps,
    React.HTMLAttributes<HTMLUListElement> {
  take?: number;
  activeClassName?: string;
  onSelected: (value: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const pagination = usePaginationRange({
    firstPage: props.firstPage,
    lastPage: props.lastPage,
    currentPage: props.currentPage,
  });

  if (pagination && pagination.length <= 1) {
    return null;
  }

  return (
    <div className='flex items-center justify-center my-4 space-x-3 text-gray-700'>
      <button
        disabled={props.currentPage === props.firstPage}
        onClick={() => props.onSelected(props.currentPage - 1)}
        className='flex items-center justify-center w-8 h-8 p-2 text-sm transition-colors duration-200 rounded-full hover:disabled:bg-transparent hover:disabled:text-gray-400 hover:bg-yellow-400 hover:text-white disabled:text-gray-400'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>
      <ul className={`flex space-x-3`}>
        {pagination!.map((pill, index) => {
          return (
            <li className='-m-0.5' key={index}>
              {typeof pill === 'string' ? (
                <span>&hellip;</span>
              ) : (
                <button
                  className={`px-2 text-lg hover:border-t-yellow-400 transition-colors duration-300 ${
                    props.currentPage === pill
                      ? `text-yellow-500 border-t-2 border-t-yellow-500 ${props.activeClassName}`
                      : 'text-gray-700 border-t-2 border-t-transparent'
                  } `}
                  onClick={() => props.onSelected(pill)}
                >
                  {pill}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <button
        disabled={props.currentPage === props.lastPage}
        onClick={() => props.onSelected(props.currentPage + 1)}
        className='flex items-center justify-center w-8 h-8 p-2 text-sm transition-colors duration-200 rounded-full hover:disabled:bg-transparent hover:disabled:text-gray-400 hover:bg-yellow-400 hover:text-white disabled:text-gray-400'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </div>
  );
};

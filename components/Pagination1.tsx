import { usePagination, usePaginationProps } from '../hooks/usePagination';

interface Pagination1Props
  extends usePaginationProps,
    React.HTMLAttributes<HTMLUListElement> {
  take: number;
  activeClassName?: string;
  onSelected: (value: number) => void;
}

export const Pagination1 = (props: Pagination1Props) => {
  const pagination = usePagination({
    firstPage: props.firstPage,
    lastPage: props.lastPage,
    currentPage: props.currentPage,
  });

  if (pagination && pagination.length <= 1) {
    return null;
  }

  return (
    <ul
      className={`flex space-x-2 border-t-2 border-t-gray-200 w-fit ${props.className}`}
    >
      {pagination!.map((pill, index) => {
        return (
          <li className='-m-0.5' key={index}>
            {typeof pill === 'string' ? (
              <span>&hellip;</span>
            ) : (
              <a
                href='#'
                className={`px-2 text-lg hover:border-t-yellow-400 transition-colors duration-300 ${
                  props.currentPage === pill
                    ? `text-yellow-500 border-t-2 border-t-yellow-500 ${props.activeClassName}`
                    : 'text-gray-700 border-t-2 border-t-transparent'
                } `}
                onClick={() => props.onSelected(pill)}
              >
                {pill}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

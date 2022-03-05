import { useMemo } from 'react';

const getArray = (begin: number, end: number) => {
  const range = end - begin + 1;
  return Array.from({ length: range }, (_, index) => index + begin);
};

export interface usePaginationProps {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  maxPills?: number;
  siblingsNumber?: number;
}

export const usePagination = ({
  firstPage,
  lastPage,
  currentPage,
  maxPills = 6,
  siblingsNumber = 1,
}: usePaginationProps) => {
  const pagination = useMemo(() => {
    const pages = lastPage - firstPage + 1;

    if (maxPills && pages <= maxPills) {
      return getArray(firstPage, lastPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsNumber, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsNumber, pages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [...getArray(firstPage, 3 + 2 * siblingsNumber), 'DOTS', pages];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      return [
        firstPage,
        'DOTS',
        ...getArray(lastPage - (2 + 2 * siblingsNumber), lastPage),
      ];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        firstPage,
        'DOTS1',
        ...getArray(leftSiblingIndex, rightSiblingIndex),
        'DOTS2',
        lastPage,
      ];
    }
  }, [firstPage, lastPage, currentPage, maxPills, siblingsNumber]);

  return pagination;
};

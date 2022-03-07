import { Pagination1 } from '../components/Pagination1';
import { ProductListItem } from '../components/ProductListItem';

import { usePaginatedProducts } from '../hooks/usePaginatedProducts';

const Pagination1Page = () => {
  const { data, isLoading, error, page, fetchPage } = usePaginatedProducts();

  if (!!error) {
    return (
      <div className='text-center'>
        Something went wrong! Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className='flex flex-col place-items-center'>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {data?.map((product) => {
          return (
            <ProductListItem
              key={product.id}
              isLink={false}
              data={{
                id: product.id,
                title: product.title,
                thumbnailSrc: product.image,
                thumbnailAlt: product.title,
              }}
            />
          );
        })}
      </ul>

      {data && (
        <Pagination1
          className='mt-6'
          firstPage={1}
          lastPage={20}
          currentPage={page || 1}
          take={20}
          onSelected={fetchPage}
        />
      )}
    </div>
  );
};

export default Pagination1Page;

import { useState } from 'react';
import { Pagination1 } from '../components/Pagination1';
import { useQuery } from 'react-query';
import { ProductListItem } from '../components/ProductListItem';

interface ApiProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  longDescription: string;
}

const fetchProducts = async (offset: number) => {
  const response = await fetch(
    `https://naszsklep-api.vercel.app/api/products/?take=25&offset=${offset}`
  );
  const data: ApiProducts[] = await response.json();
  return data;
};

const Pagination1Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useQuery(
    ['products', { page: currentPage }],
    () => fetchProducts(currentPage * 25),
    {
      keepPreviousData: true,
    }
  );

  if (!!error) {
    return (
      <div className='text-center'>
        Something went wrong! Please try again later.
      </div>
    );
  }

  return (
    <div className='flex flex-col place-items-center'>
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {data?.map((product) => {
          return (
            <ProductListItem
              key={product.id}
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
          currentPage={currentPage}
          take={20}
          onSelected={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default Pagination1Page;

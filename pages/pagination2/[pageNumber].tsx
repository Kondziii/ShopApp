import { fetchProducts } from '../../service/products';
import { InferGetStaticPropsType } from 'next';
import { InferGetStaticPaths } from '../products/[productId]';
import { ProductListItem } from '../../components/ProductListItem';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Pagination1 } from '../../components/Pagination1';

const Pagination2Page = ({
  data,
  pageNumber,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const handleSelectedPage = useCallback(
    (page) => {
      router.push(`/pagination2/${page}`);
    },
    [router]
  );

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
          currentPage={+pageNumber}
          take={20}
          onSelected={handleSelectedPage}
        />
      )}
    </div>
  );
};

export default Pagination2Page;

export const getStaticPaths = async () => {
  const pagesNumber = Array.from({ length: 10 }, (_, i) => i + 1);

  return {
    paths: pagesNumber.map((pageNumber) => ({
      params: {
        pageNumber: pageNumber.toString(),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  const data = await fetchProducts(parseInt(params?.pageNumber || '1'));
  return {
    props: {
      data,
      pageNumber: params!.pageNumber,
    },
  };
};

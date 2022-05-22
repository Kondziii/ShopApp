import React, { useEffect, useRef, useState } from 'react';
import { ProductFullInfoType } from './ProductDetails';
import Image from 'next/image';
import Slider from 'react-slick';
import { mod } from './utils/functions';
import AppModal from './AppModal';
import { ImageSlider } from './ImageSlider';

interface ProductDetailsImageProps {
  product: ProductFullInfoType;
}

export const ProductDetailsImage = ({ product }: ProductDetailsImageProps) => {
  const [currImage, setCurrImage] = useState(product.images[0].url);

  return (
    <div className=''>
      <AppModal
        panelClassName='bg-transparent mx-2 w-full sm:w-10/12 md:w-2/5'
        customBtn={
          <div className='p-4 mb-4 bg-white rounded-md shadow'>
            <Image
              layout='responsive'
              width={4}
              height={3}
              className='object-contain text-center aspect-video'
              src={currImage}
              alt={product.name}
            />
          </div>
        }
      >
        <div className='p-4 mb-4 bg-white rounded-md shadow'>
          <Image
            layout='responsive'
            width={4}
            height={3}
            className='object-contain text-center aspect-video'
            src={currImage}
            alt={product.name}
          />
        </div>
        {product.images.length > 1 && (
          <div className='w-10/12 mx-auto'>
            <ImageSlider
              alt={product.name}
              images={product.images}
              setImage={setCurrImage}
            />
          </div>
        )}
      </AppModal>

      {product.images.length > 1 && (
        <div className='w-10/12 mx-auto'>
          <ImageSlider
            alt={product.name}
            images={product.images}
            setImage={setCurrImage}
          />
        </div>
      )}
    </div>
  );
};

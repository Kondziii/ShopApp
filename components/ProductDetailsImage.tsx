import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ProductFullInfoType } from './ProductDetails';
import Image from 'next/image';
import Slider from 'react-slick';
import { mod } from './utils/functions';

function SampleNextArrow({ onClick }: any) {
  return (
    <button
      onClick={onClick}
      className=' z-20 top-1/2 -right-7 bg-slate-700 text-white rounded-full h-5 w-5 absolute flex items-center justify-center'
    >
      &gt;
    </button>
  );
}

function SamplePrevArrow({ onClick }: any) {
  return (
    <button
      className='absolute z-20 top-1/2 -left-7  rounded-full h-5 w-5 bg-slate-700 text-white flex items-center justify-center '
      onClick={onClick}
    >
      &lt;
    </button>
  );
}

interface ProductDetailsImageProps {
  product: ProductFullInfoType;
}

export const ProductDetailsImage = ({ product }: ProductDetailsImageProps) => {
  const [currImage, setCurrImage] = useState(product.images[0].url);
  const [currIndex, setCurrIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setCurrIndex(index);
  };

  useEffect(() => {
    setCurrImage(product.images[currIndex].url);
  }, [currIndex, setCurrImage, product.images]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode == 37) {
      setCurrIndex((prev) => mod(prev - 1, product.images.length));
    }
    if (e.keyCode == 39) {
      setCurrIndex((prev) => mod(prev + 1, product.images.length));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (product.images.length > 1) {
    return (
      <div className=''>
        <div className='p-4 bg-white rounded-md shadow mb-4'>
          <Image
            layout='responsive'
            width={4}
            height={3}
            className='object-contain text-center aspect-video'
            src={currImage}
            alt={product.name}
          />
        </div>
        <div className='w-10/12 mx-auto'>
          <Slider {...settings}>
            {product.images.map((image, index) => {
              return (
                <div
                  key={image.url}
                  onClick={() => handleImageChange(index)}
                  onKeyDown={(e) => {
                    console.log('hej');
                    if (e.key == 'Enter') {
                      console.log('elo');
                    }
                  }}
                  className='p-4 bg-white rounded-md hover:opacity-90 transition duration-300 cursor-pointer shadow-sm mx-2'
                >
                  <Image
                    layout='responsive'
                    width={4}
                    height={3}
                    objectFit='contain'
                    src={image.url}
                    alt={product.name}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 bg-white rounded-md shadow-md'>
      <Image
        layout='responsive'
        width={4}
        height={3}
        className='object-contain text-center aspect-video'
        src={product.images[0].url}
        alt={product.name}
      />
    </div>
  );
};

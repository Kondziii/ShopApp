import React from 'react';
import Slider from 'react-slick';
import { CarouselItemFragment } from '../generated/graphql';
import Image from 'next/image';
import Link from 'next/link';

interface AppCarouselProps {
  items: Array<CarouselItemFragment>;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className='absolute z-20 top-1/2 right-2 bg-white rounded-full h-8 w-8'
      onClick={onClick}
    >
      &gt;
    </button>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className='absolute z-20 top-1/2 left-2 bg-white rounded-full h-8 w-8 '
      onClick={onClick}
    >
      &lt;
    </button>
  );
}

export const AppCarousel = ({ items }: AppCarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow className />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id} className='relative'>
              <div className='absolute left-16 top-1/3 z-20 h-100 w-50 '>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold tracking-wide mb-2 md:mb-4'>
                  {item.title}
                </h3>
                {item.description?.split('.').map((sentence) => {
                  return (
                    <p
                      className='mb-0 text-gray-700 hidden lg:block'
                      key={sentence}
                    >
                      {sentence}
                    </p>
                  );
                })}
                <Link href='/offer'>
                  <a className='inline-block text-sm sm:text-base md:mt-4 mt-1 border border-slate-700 px-4 py-2 rounded-full hover:bg-slate-700 hover:text-white transition duration-300'>
                    Zobacz ofertę
                  </a>
                </Link>
              </div>
              <div className='w-full z-10'>
                <Image
                  width={20}
                  height={6}
                  objectFit='cover'
                  layout='responsive'
                  src={item.image!.url}
                  alt=''
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

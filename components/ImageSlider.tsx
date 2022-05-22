import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { mod } from './utils/functions';

interface ImageSliderProps {
  images: Array<{
    url: string;
  }>;
  alt: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageSlider = ({ images, alt, setImage }: ImageSliderProps) => {
  const [currIndex, setCurrIndex] = useState(0);

  function SamplePrevArrow({ onClick }: any) {
    return (
      <button
        className='absolute z-20 flex items-center justify-center w-6 h-6 text-white -translate-y-1/2 rounded-full top-1/2 -left-7 bg-slate-700 '
        onClick={() => {
          onClick();
          setCurrIndex((prev) => mod(prev - 1, images.length));
        }}
      >
        &lt;
      </button>
    );
  }

  function SampleNextArrow({ onClick }: any) {
    return (
      <button
        className='absolute z-20 flex items-center justify-center w-6 h-6 text-white -translate-y-1/2 rounded-full top-1/2 -right-7 bg-slate-700'
        onClick={() => {
          onClick();
          setCurrIndex((prev) => mod(prev + 1, images.length));
        }}
      >
        &gt;
      </button>
    );
  }

  const slider = useRef<any>();
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
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slideNext = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const slidePrev = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const slideGoTo = (index: number) => {
    if (slider.current) {
      slider.current.slickGoTo(index);
    }
  };

  const handleImageChange = (index: number) => {
    setCurrIndex(index);
    slideGoTo(index);
  };

  useEffect(() => {
    setImage(images[currIndex].url);
  }, [currIndex, setImage, images]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode == 37) {
      setCurrIndex((prev) => mod(prev - 1, images.length));
      slidePrev();
    }
    if (e.keyCode == 39) {
      setCurrIndex((prev) => mod(prev + 1, images.length));
      slideNext();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Slider ref={slider} {...settings}>
      {images.map((image, index) => {
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
            className='p-4 mx-2 transition duration-300 bg-white rounded-md shadow-sm cursor-pointer hover:opacity-90'
          >
            <Image
              layout='responsive'
              width={4}
              height={3}
              objectFit='contain'
              src={image.url}
              alt={alt}
            />
          </div>
        );
      })}
    </Slider>
  );
};

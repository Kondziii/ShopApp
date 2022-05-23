import React from 'react';
import Marquee from 'react-fast-marquee';
import { MarqueeItem } from './MarqueeItem';

export const AppMarquee = () => {
  return (
    <Marquee
      gradientWidth={0}
      speed={40}
      className='h-24 bg-slate-700 text-white my-4'
    >
      <MarqueeItem
        title='Darmowa dostawa zakupów od 100 zł.'
        image='/freeDelivery.svg'
      />
      <MarqueeItem title='Szybka dostawa i łatwe zwroty.' image='/return.svg' />
      <MarqueeItem title='Bezpieczne zakupy SSL.' image='/safeShopping.svg' />
      <MarqueeItem
        title='Jesteśmy polskim sklepem.'
        image='/shopLocation.svg'
      />
      <MarqueeItem
        title='Znajdziesz u nas znane globalnie marki.'
        image='/shopBrands.svg'
      />
    </Marquee>
  );
};

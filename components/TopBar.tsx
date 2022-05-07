import React, { useEffect, useState } from 'react';

const titles = [
  {
    id: 1,
    title: 'Free shipping from 100$',
  },
  {
    id: 2,
    title: 'Return up to 30 days',
  },
  {
    id: 3,
    title: 'Delivery within 1-3 working days',
  },
];

export const TopBar = () => {
  const [curTitle, setCurTitle] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurTitle((curr) => {
        return (curr + 1) % titles.length;
      });
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [curTitle]);

  return (
    <div className='bg-slate-700 text-white py-3 shadow-sm shadow-slate-500 '>
      <ul className='sm:flex sm:gap-10 md:gap-16 lg:gap-20 text-xs justify-center uppercase font-medium tracking-wider px-2 container mx-auto hidden'>
        {titles.map((title) => {
          return <li key={title.id}>{title.title}</li>;
        })}
      </ul>
      <p
        key={curTitle}
        className='sm:hidden text-center animate-fade-in duration-500'
      >
        {titles[curTitle].title}
      </p>
    </div>
  );
};

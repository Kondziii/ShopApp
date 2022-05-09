import React, { useEffect, useState } from 'react';

const titles = [
  {
    id: 1,
    title: 'Darmowa dostawa od 100zł',
  },
  {
    id: 2,
    title: 'Możliwosć zwrotu do 30 dni',
  },
  {
    id: 3,
    title: 'Szybka dostawa w przeciągu 2-3 dni',
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
    <div className='bg-slate-700 text-white py-3 shadow-sm shadow-slate-500 sticky top-0 z-60'>
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

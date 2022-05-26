import React, { ReactNode, useState } from 'react';

interface AppTooltipProps {
  children: ReactNode;
  message: string;
  position?: 'top' | 'bottom';
}

export const AppTooltip = ({
  children,
  message,
  position = 'top',
}: AppTooltipProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      className='relative h-fit'
      onMouseLeave={() => setIsMouseOver(false)}
      onMouseOver={() => setIsMouseOver(true)}
    >
      {isMouseOver && (
        <span
          className={`absolute lowercase font-normal text-black px-4 py-1 text-xs rounded-full shadow opacity-0 animate-fade-in left-0 -translate-x-1/3 bg-gray-50 w-fit ${
            position === 'top' ? '-top-10' : '-bottom-10'
          }`}
        >
          {message}
        </span>
      )}
      {children}
    </div>
  );
};

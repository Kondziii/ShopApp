import React, { Children } from 'react';

interface AfterPaymentInfoProps {
  children: React.ReactNode;
}

export const AfterPaymentInfo = ({ children }: AfterPaymentInfoProps) => {
  return <div className='p-8 my-8 bg-white rounded shadow'>{children}</div>;
};

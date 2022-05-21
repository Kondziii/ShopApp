import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export const AppSpinner = () => {
  return (
    <div className='text-center'>
      <BeatLoader color={'#EAB308'} loading={true} size={10} />
    </div>
  );
};

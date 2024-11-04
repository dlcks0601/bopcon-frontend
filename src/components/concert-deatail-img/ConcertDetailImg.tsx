import React from 'react';
import sampleImg from '@/assets/images/sampleimg1.jpg';

const ConcertDetailImg: React.FC = () => {
  return (
    <div className='flex justify-center items-center py-[30px] px-[50px] bg-white'>
      <img
        src={sampleImg}
        alt='Concert Detail'
        className='w-full h-auto object-cover'
      />
    </div>
  );
};

export default ConcertDetailImg;

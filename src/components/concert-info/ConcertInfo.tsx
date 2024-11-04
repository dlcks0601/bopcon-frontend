// components/ConcertInfo.tsx

import React from 'react';
import { concertInfoData } from '@/constants/concertInfoData';

const ConcertInfo: React.FC = () => {
  const { schedule, location, ticket } = concertInfoData;

  return (
    <div className='flex flex-col gap-4 px-8 py-4 bg-white'>
      <div className='flex justify-between'>
        <span className='text-black font-light'>공연 일정</span>
        <span className='text-gray-600 text-sm'>{schedule}</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-black  font-light'>공연 장소</span>
        <span className='text-gray-600 text-sm'>{location}</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-black font-light'>티켓 예매</span>
        <span className='text-gray-600 text-sm'>{ticket}</span>
      </div>
    </div>
  );
};

export default ConcertInfo;

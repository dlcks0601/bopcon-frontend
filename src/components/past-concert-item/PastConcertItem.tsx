import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PastConcertItemProps {
  date: number[]; // [year, month, day] 형식
  location: string;
  description: string;
}

const PastConcertItem: React.FC<PastConcertItemProps> = ({
  date,
  location,
  description,
}) => {
  // 날짜를 배열에서 분리
  const [year, month, day] = date;

  return (
    <div className='flex items-center justify-between p-4 py-4'>
      {/* 날짜 표시 */}
      <div className="flex flex-col items-center justify-center bg-black text-white w-16 h-16 text-center mr-5">
        <span className="text-lg font-bold">{year}</span>
        <span className="text-sm font-semibold">
          {String(month).padStart(2, '0')}/{String(day).padStart(2, '0')}
        </span>
      </div>

      {/* 공연 정보 */}
      <div className='flex-grow'>
        <h3 className='text-md font-medium text-gray-900'>{location}</h3>
        <p className='text-sm text-gray-600'>{description}</p>
      </div>

      {/* 화살표 아이콘 */}
      <ChevronRightIcon className='w-5 h-5 text-gray-500' />
    </div>
  );
};

export default PastConcertItem;

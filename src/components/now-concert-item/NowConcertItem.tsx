import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface NowConcertItemProps {
  date: string; // 날짜 정보
  name?: string; // 내한 공연 이름 (옵션)
}

const NowConcertItem: React.FC<NowConcertItemProps> = ({
  date,
  name,
}) => {
  const [year, day] = date.split(' ');

  return (
    <div className="flex items-center justify-between p-4">
      {/* 날짜 */}
      <div className="flex flex-col items-center justify-center bg-black text-white w-14 h-14 text-center mr-5">
        <span className="text-sm font-semibold">{year}</span>
        <span className="text-sm font-semibold">{day}</span>
      </div>

      {/* 공연 정보 */}
      <div className="flex-grow">
        {name && <h3 className="text-md font-medium text-gray-900">{name}</h3>}

      </div>

      {/* 화살표 */}
      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
};

export default NowConcertItem;
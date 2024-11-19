import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface ConcertListItemProps {
  date: string; // 날짜 정보
  location?: string; // 공연 장소 (옵션)
  name?: string; // 내한 공연 이름 (옵션)
  description?: string; // 지난 공연 설명 (옵션)
}

const ConcertListItem: React.FC<ConcertListItemProps> = ({
  date,
  location,
  name,
  description,
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
        {location && <h3 className="text-md font-medium text-gray-900">{location}</h3>}
        {name && <p className="text-sm text-gray-600">{name}</p>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>

      {/* 화살표 */}
      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
};

export default ConcertListItem;

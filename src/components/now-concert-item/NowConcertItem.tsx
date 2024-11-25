import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface NowConcertItemProps {
  date: string; // 날짜 정보 (예: "2024-11-30")
  name: string; // 내한 공연 이름
}

const NowConcertItem: React.FC<NowConcertItemProps> = ({ date, name }) => {
  // 날짜 포맷 처리 (예: "2024-11-30" -> year: "2024", month: "11", day: "30")
  const [year, month, day] = date.split('-');

  const handleItemClick = () => {
    console.log('Concert clicked:', name);
    // 추가 동작 필요 시 여기에 작성
  };

  return (
    <div
      onClick={handleItemClick}
      className="flex items-center justify-between p-4 cursor-pointer"
    >
      {/* 날짜 */}
      <div className="flex flex-col items-center justify-center bg-black text-white w-16 h-16 text-center mr-5">
        <span className="text-lg font-bold">{year}</span>
        <span className="text-sm font-semibold">
          {month}/{day}
        </span>
      </div>

      {/* 공연 정보 */}
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-900 truncate">{name}</h3>
      </div>

      {/* 화살표 */}
      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
};

export default NowConcertItem;

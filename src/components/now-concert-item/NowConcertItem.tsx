import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';


interface NowConcertItemProps {
  startDate: number[]; // 날짜 정보 ([year, month, day] 형식)
  endDate: number[];
  name: string; // 내한 공연 이름
}

const NowConcertItem: React.FC<NowConcertItemProps> = ({ startDate, endDate, name }) => {
  // 날짜 포맷팅 함수
  const formatDate = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    const shortYear = String(year).slice(-2);
    return `${shortYear}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

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
        {startDate.toString() === endDate.toString() ? (
            // startDate와 endDate가 같을 경우
            <>
              <span className="text-lg font-bold">{startDate[0]}</span>
              <span className="text-lg font-semibold">{`${String(startDate[1]).padStart(2, '0')}/${String(startDate[2]).padStart(2, '0')}`}</span>
            </>
        ) : (
            // startDate와 endDate가 다를 경우
            <span className="text-sm font-semibold">
            {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
          </span>
        )}
      </div>

      {/* 공연 정보 */}
      <div className="flex-grow">
        <h3 className="text-md font-semibold text-gray-900 truncate">{name}</h3>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </div>
  );
};

export default NowConcertItem;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertListItem from '../concert-list-item/ConcertListItem';

interface PastConcertListProps {
  mode: 'upcoming' | 'past'; // 내한 공연, 지난 공연 구분
  data?: Array<{
    id: number;
    date: string;
    location?: string;
    name?: string;
    description?: string;
  }>;
}

const PastConcertList: React.FC<PastConcertListProps> = ({ mode, data = [] }) => {
  const navigate = useNavigate();

  // 클릭 핸들러
  const handlePastItemClick = () => {
    navigate('/setlist');
  };

  const handleUpcomingItemClick = () => {
    navigate('/concert');
  };

  // 데이터가 없을 경우 메시지 표시
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        {mode === 'past' ? 'No past concerts available.' : 'No upcoming concerts available.'}
      </div>
    );
  }

  return (
    <div className="w-full">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={mode === 'past' ? handlePastItemClick : handleUpcomingItemClick}
          className="cursor-pointer"
        >
          <ConcertListItem
            date={item.date}
            location={mode === 'past' ? item.location : undefined}
            name={mode === 'upcoming' ? item.name : undefined}
            description={mode === 'past' ? item.description : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default PastConcertList;

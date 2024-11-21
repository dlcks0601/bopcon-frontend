import React from 'react';
import { useNavigate } from 'react-router-dom';
import PastConcertItem from '../past-concert-item';

interface PastConcertListProps {
  data?: Array<{
    id: number;
    date: string;
    location: string;
    description: string;
  }>;
}

const PastConcertList: React.FC<PastConcertListProps> = ({ data = [] }) => {
  const navigate = useNavigate();

  // 클릭 핸들러
  const handleItemClick = () => {
    navigate('/setlist');
  };

  // 데이터가 없을 경우 메시지 표시
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No past concerts available.
      </div>
    );
  }

  return (
    <div className="w-full">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={handleItemClick}
          className="cursor-pointer"
        >
          <PastConcertItem
            date={item.date}
            location={item.location}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default PastConcertList;

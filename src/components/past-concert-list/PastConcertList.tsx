// components/PastConcertList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PastConcertItem from '../past-concert-item';
import { pastConcertData } from '@/constants/pastConcertData';

const PastConcertList: React.FC = () => {
  const navigate = useNavigate();

  // 클릭 핸들러
  const handleItemClick = () => {
    // id 없이 SetListPage로 이동
    navigate('/setlist');
  };

  return (
    <div className='w-full'>
      {pastConcertData.map((concert) => (
        <div
          key={concert.id}
          onClick={handleItemClick} // 클릭 시 SetListPage로 이동
          className='cursor-pointer' // 클릭 가능 커서 추가
        >
          <PastConcertItem
            date={concert.date}
            location={concert.location}
            description={concert.description}
          />
        </div>
      ))}
    </div>
  );
};

export default PastConcertList;

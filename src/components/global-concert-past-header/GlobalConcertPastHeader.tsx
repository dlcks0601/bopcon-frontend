// components/GlobalPastConcertHeader.tsx

import React from 'react';
import DetailName from '../detail-name.tsx';
import Like from '../concert-like/ConcertLike';
import { pastConcertData } from '@/constants/pastConcertData';

const GlobalPastConcertHeader: React.FC = () => {
  // 특정 콘서트 데이터를 선택 (예: id가 1인 콘서트 데이터)
  const concert = pastConcertData.find((concert) => concert.id === 1);

  if (!concert) return null; // 데이터가 없을 경우 null 반환

  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <DetailName title={concert.description} subtitle={concert.location} />
      
      <Like concertId={concert.id} />
    </div>
  );
};

export default GlobalPastConcertHeader;

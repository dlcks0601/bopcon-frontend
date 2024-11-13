import React from 'react';
import DetailName from '../detail-name.tsx';
import Like from '../like/Like.tsx';
import { concertData } from '@/constants/concertData';

const GlobalConcertHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <DetailName title={concertData.title} subtitle={concertData.subtitle} />
      <Like />
    </div>
  );
};

export default GlobalConcertHeader;

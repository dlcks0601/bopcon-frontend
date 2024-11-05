import React from 'react';
import DetailName from '../detail-name.tsx';
import Like from '../like/Like.tsx';
import { singerData } from '@/constants/singerData';

const GlobalSingerHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <DetailName title={singerData.title} subtitle={singerData.subtitle} />
      <Like />
    </div>
  );
};

export default GlobalSingerHeader;

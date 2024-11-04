import React from 'react';
import DetailName from '../detail-name.tsx';
import Like from '../like/Like.tsx';

const GlobalHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <DetailName
        title='벤슨 분 첫 단독 내한공연'
        subtitle='(Live Nation Presents Benson Boone)'
      />
      <Like />
    </div>
  );
};

export default GlobalHeader;

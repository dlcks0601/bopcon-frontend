// GlobalListContents.tsx

import React from 'react';

interface GlobalListContentsProps {
  title: string;
}

const GlobalListContents: React.FC<GlobalListContentsProps> = ({ title }) => {
  return (
    <div className='flex flex-col w-full mx-auto h-auto py-[8px]'>
      {/* 상단 타이틀과 더보기 */}
      <div className='w-full flex justify-between items-center px-4 py-[18px]'>
        <div
          className='font-bold text-black text-[30px]'
          style={{ fontFamily: 'Agenda One, sans-serif' }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default GlobalListContents;

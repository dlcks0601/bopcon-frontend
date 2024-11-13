import React from 'react';

interface GlobalListProps {
  title: string; // 제목을 동적으로 받기 위한 props
}

const GlobalList: React.FC<GlobalListProps> = ({ title }) => {
  return (
    <div className='px-7 py-2'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <hr className='border-t-1 border-gray-400 mt-5' />
    </div>
  );
};

export default GlobalList;

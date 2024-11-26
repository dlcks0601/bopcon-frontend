import React from 'react';

interface MyItemProps {
  name: string;
  number: number; // number 데이터를 추가로 받음
}

const MyItem: React.FC<MyItemProps> = ({ name, number }) => {
  return (
    <div className='flex items-center justify-between p-4 py-2'>
      {/* 번호 표시 */}
      <div className='flex flex-col items-center justify-center w-14 h-14 text-center mr-5'>
        <span className='text-lg font-bold text-gray-700'>{number}</span> {/* number 표시 */}
      </div>

      {/* 아티스트 이름 표시 */}
      <div className='flex-grow'>
        <h3 className='text-md font-medium text-gray-900'>{name}</h3>
      </div>
    </div>
  );
};

export default MyItem;

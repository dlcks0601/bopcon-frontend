import React from 'react';

interface MyItemProps {
  name: string;
  imgurl: string; // imgurl 데이터를 추가로 받음
}

const MyItem: React.FC<MyItemProps> = ({ name, imgurl }) => {
  return (
    <div className='flex items-center justify-between p-4 py-2'>
      {/* 이미지 표시 */}
      <div className='flex flex-col items-center justify-center w-16 h-16 text-center mr-5'>
        <img
          src={imgurl}
          alt={`${name} 이미지`}
          className='w-full h-full object-cover '
        />
      </div>

      {/* 아티스트 이름 표시 */}
      <div className='flex-grow'>
        <h3 className='text-md font-medium text-gray-900'>{name}</h3>
      </div>
    </div>
  );
};

export default MyItem;

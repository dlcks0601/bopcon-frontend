import React from 'react';
import { writeData } from '@/constants/writeData';
import WriteItem from '../write-item/WriteItem';

 

const WriteList: React.FC = () => {

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {writeData.map((post, index) => (
        <WriteItem
          key={index}
          title={post.title}
          content={post.content}
          detail={post.detail}
          date={post.date}
          nickname={post.nickname}
        />
      ))}
    </div>
  );
};

export default WriteList;

import React from 'react';
import Like from '../like/Like';

interface GlobalSingerHeaderProps {
  krName: string; // 아티스트 이름
  engName: string; // 영어 이름
}

const GlobalSingerHeader: React.FC<GlobalSingerHeaderProps> = ({ krName, engName }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <div>
        <h1 className="text-xl font-bold">{krName}</h1>
        <h2 className="text-sm text-gray-500">{engName}</h2>
      </div>
      <Like />
    </div>
  );
};

export default GlobalSingerHeader;

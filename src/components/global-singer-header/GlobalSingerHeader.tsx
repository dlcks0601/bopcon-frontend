import React from 'react';
import ArtistLike from '../artist-like';

interface GlobalSingerHeaderProps {
  krName: string; // 아티스트 이름
  engName: string; // 영어 이름
  likeId: number;
}

const GlobalSingerHeader: React.FC<GlobalSingerHeaderProps> = ({
  krName,
  engName,
  likeId,
}) => {
  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <div>
        <h1 className='text-xl font-bold'>{krName}</h1>
        <h2 className='text-sm text-gray-500'>{engName}</h2>
      </div>
      <ArtistLike artistId={likeId} />
    </div>
  );
};

export default GlobalSingerHeader;

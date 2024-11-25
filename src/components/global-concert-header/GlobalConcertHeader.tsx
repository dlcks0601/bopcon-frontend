import React from 'react';
import DetailName from '../detail-name.tsx';
import ConcertLike from '../concert-like/index.tsx';

interface GlobalConcertHeaderProps {
  title: string;
  subTitle: string;
  likeId: number; // 콘서트 ID
}

const GlobalConcertHeader: React.FC<GlobalConcertHeaderProps> = ({
  title,
  subTitle,
  likeId,
}) => {
  return (
    <div className='flex items-center justify-between px-8 py-4'>
      <DetailName title={title} subtitle={subTitle} />
      {/* ConcertLike 컴포넌트에 concertId 전달 */}
      <ConcertLike concertId={likeId} />
    </div>
  );
};

export default GlobalConcertHeader;

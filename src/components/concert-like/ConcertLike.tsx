import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  addConcertFavorite,
  removeConcertFavorite,
} from '@/store/slices/concertFavoritesSlice';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';

interface ConcertLikeProps {
  concertId: number; // 콘서트 ID
}

const ConcertLike: React.FC<ConcertLikeProps> = ({ concertId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { concertFavorites } = useSelector((state: RootState) => state.likes); // Redux 상태에서 즐겨찾기 정보 가져오기
  const { token } = useSelector((state: RootState) => state.auth); // Redux에서 token 가져오기

  const isLiked = concertFavorites.some((fav) => fav.concert_id === concertId); // 좋아요 상태 확인

  const handleLikeToggle = () => {
    if (!token) {
      alert('로그인이 필요합니다!');
      return; // token이 없으면 함수 실행 중단
    }

    if (isLiked) {
      dispatch(removeConcertFavorite({ concertId })); // token이 null이 아님을 보장
    } else {
      dispatch(addConcertFavorite({ concertId })); // token이 null이 아님을 보장
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      className='flex items-center justify-center w-8 h-8'
      aria-label={isLiked ? '좋아요 취소' : '좋아요 추가'}
    >
      {isLiked ? (
        <SolidHeartIcon className='w-6 h-6 text-pink-500' />
      ) : (
        <OutlineHeartIcon className='w-6 h-6 text-gray-400' />
      )}
    </button>
  );
};

export default ConcertLike;

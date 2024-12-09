import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  addFavorite,
  removeFavorite,
  setLoading,
  setError,
} from '@/store/slices/concertFavoritesSlice';
import {
  addConcertFavorite as apiAddConcertFavorite,
  removeConcertFavorite as apiRemoveConcertFavorite,
  checkConcertFavorite as apiCheckConcertFavorite,
} from '@/apis/favorites.api';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface ConcertLikeProps {
  concertId: number;
}

const ConcertLike: React.FC<ConcertLikeProps> = ({ concertId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.concertlikes.loading);

  const [favorite, setFavorite] = useState<boolean>(false);

  // 서버에서 즐겨찾기 여부 확인
  useEffect(() => {
    if (!token) return;

    const fetchFavoriteStatus = async () => {
      try {
        const { favorite } = await apiCheckConcertFavorite({
          concertId,
          token,
        });
        setFavorite(favorite);
      } catch (error) {
        console.error('Error checking concert favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [token, concertId]);

  const handleLikeToggle = async () => {
    if (!token) {
      alert('로그인이 필요합니다!');
      navigate('/login');
      return;
    }

    dispatch(setLoading(true));

    try {
      if (favorite) {
        // 즐겨찾기 제거
        await apiRemoveConcertFavorite({ concertId, token });
        setFavorite(false);
        dispatch(removeFavorite({ concertId }));
      } else {
        // 즐겨찾기 추가
        await apiAddConcertFavorite({ concertId, token });
        setFavorite(true);
        const newFavorite = {
          favoriteId: Math.random(), // 임시 ID
          artistId: null,
          concertId,
        };
        dispatch(addFavorite(newFavorite));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      dispatch(setError('즐겨찾기 처리 중 문제가 발생했습니다.'));
      alert('즐겨찾기 처리 중 문제가 발생했습니다.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      className='flex items-center justify-center w-8 h-8'
      aria-label={favorite ? '좋아요 취소' : '좋아요 추가'}
      disabled={loading}
    >
      {favorite ? (
        <SolidHeartIcon className='w-6 h-6 text-pink-500' />
      ) : (
        <OutlineHeartIcon className='w-6 h-6 text-gray-400' />
      )}
    </button>
  );
};

export default ConcertLike;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  addFavorite,
  removeFavorite,
  setLoading,
  setError,
} from '@/store/slices/artistFavoritesSlice';
import {
  addArtistFavorite as apiAddArtistFavorite,
  removeArtistFavorite as apiRemoveArtistFavorite,
} from '@/apis/favorites.api';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';

interface ArtistLikeProps {
  artistId: number;
}

const ArtistLike: React.FC<ArtistLikeProps> = ({ artistId }) => {
  const dispatch = useDispatch();
  const artistFavorites = useSelector(
    (state: RootState) => state.artistlikes.artistFavorites
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.artistlikes.loading);

  const favorite = artistFavorites.find((fav) => fav.artistId === artistId);

  const handleLikeToggle = async () => {
    if (!token) {
      alert('로그인이 필요합니다!');
      return;
    }

    dispatch(setLoading(true));

    try {
      if (favorite) {
        await apiRemoveArtistFavorite({ artistId, token });
        dispatch(removeFavorite({ artistId }));
      } else {
        await apiAddArtistFavorite({ artistId, token });
        const newFavorite = {
          favoriteId: Math.random(),
          artistId,
          concertId: null,
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

export default ArtistLike;

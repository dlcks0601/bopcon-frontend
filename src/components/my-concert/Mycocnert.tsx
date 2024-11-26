import React, { useEffect, useState } from 'react';
import MyItem from '../my-item';
import { getUserFavorites } from '@/apis/favorites.api';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

interface MyConcertProps {
  isExpanded: boolean; // 더보기 상태를 받아옴
}

const MyConcert: React.FC<MyConcertProps> = ({ isExpanded }) => {
  const [favoriteArtists, setFavoriteArtists] = useState<any[]>([]); // 즐겨찾기 데이터를 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const token = useSelector((state: RootState) => state.auth.token); // Redux에서 토큰 가져오기

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setError('로그인이 필요합니다.');
        return;
      }

      setLoading(true);
      try {
        const favorites = await getUserFavorites({ token });
        setFavoriteArtists(favorites);
        setError(null);
      } catch (err) {
        setError('즐겨찾기 데이터를 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // newConcertTitle이 null이 아닌 항목만 필터링
  const filteredData = favoriteArtists.filter((concert) => concert.newConcertTitle !== null);

  // isExpanded가 true면 모든 데이터, false면 2개만 표시
  const visibleData = isExpanded ? filteredData : filteredData.slice(0, 2);

  return (
    <div className="w-full">
      {visibleData.map((concert) => (
        <div key={concert.id}>
          <MyItem 
            name={concert.newConcertTitle} 
            number={concert.favoriteId} // 이미지 URL 전달
          />
        </div>
      ))}
    </div>
  );
};

export default MyConcert;

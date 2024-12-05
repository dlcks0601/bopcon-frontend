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

  // 즐겨찾기 데이터를 가져오는 함수
  const fetchFavorites = async () => {
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      const favorites = await getUserFavorites({ token });
      console.log('Fetched Favorites:', favorites); // 디버깅용 콘솔
      setFavoriteArtists(favorites);
      setError(null);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('즐겨찾기 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 마운트되거나 토큰이 변경될 때 데이터를 가져옴
  useEffect(() => {
    fetchFavorites();
  }, [token]);

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러가 발생했을 때
  if (error) {
    return <div>{error}</div>;
  }

  // 새로운 콘서트 제목이 있는 항목만 필터링
  const filteredData = favoriteArtists.filter(
    (concert) => concert.newConcertTitle !== null
  );

  // 표시할 데이터 (isExpanded에 따라 조절)
  const visibleData = isExpanded ? filteredData : filteredData.slice(0, 2);

  return (
    <div className="w-full">
      {visibleData.map((concert) => (
        <div key={concert.id || concert.newConcertTitle}>
          <MyItem 
            name={concert.newConcertTitle} 
            imgurl={concert.posterUrl} // 이미지 URL 전달
          />
        </div>
      ))}
    </div>
  );
};

export default MyConcert;

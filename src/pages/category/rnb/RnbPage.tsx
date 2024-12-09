import React, { ReactNode, useEffect, useState } from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ConcertCard {
  artistId: string;
  artistName: ReactNode;
  newConcertId: number; // newConcertId 추가
  posterUrl: string;
  title: string;
  name: string;
  startDate: number[];
  endDate: number[];
}

const RnbPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setIsLoading(true);
        // API 호출 (쿼리 파라미터를 직접 URL에 추가)
        const response = await axios.get('/api/new-concerts?genre=R&B');

        // 데이터를 정렬한 뒤 상태에 저장
        const latestConcerts = response.data.sort(
          (a: { newConcertId: number }, b: { newConcertId: number }) =>
            b.newConcertId - a.newConcertId
        );

        setCardData(latestConcerts);
      } catch (err) {
        console.error('Error fetching concerts:', err);
        setError('Failed to load concerts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  // 아티스트 이름 클릭 핸들러
  const handleArtistClick = (artistId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중단
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        {/* Global Navigation Bar */}
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>

        {/* 카테고리 헤더 - 개별 div로 묶어서 여백 제어 */}
        <div className='py-0'>
          <CategoryHeader title='R&B' />
        </div>

        {/* 로딩 및 에러 처리 */}
        {isLoading ? (
          <div className='text-center mt-8'>Loading...</div>
        ) : error ? (
          <div className='text-center mt-8 text-red-500'>{error}</div>
        ) : (
          <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
            {cardData.map((card) => (
              <CategoryCard
                key={card.newConcertId} // newConcertId를 키로 사용
                concertId={card.newConcertId} // 그대로 newConcertId 전달
                image={card.posterUrl}
                title={card.title}
                name={
                  <span
                    className="text-[#8c8c8c]  cursor-pointer"
                    onClick={(e) => handleArtistClick(card.artistId, e)}
                  >
                    {card.artistName}
                  </span>
                }
                startDate={card.startDate}
                endDate={card.endDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RnbPage;

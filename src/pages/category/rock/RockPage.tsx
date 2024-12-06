import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';

interface ConcertCard {
  newConcertId: number; // newConcertId 추가
  posterUrl: string;
  title: string;
  name: string;
  startDate: number[];
  endDate: number[];
}

const RockPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  useEffect(() => {
    // API 호출
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/new-concerts?genre=ROCK'); // ROCK 장르로 수정
        setCardData(response.data); // 응답 데이터를 상태로 설정
        setIsLoading(false); // 로딩 완료
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data'); // 에러 상태 설정
        setIsLoading(false);
      }
    };

    fetchConcerts();
  }, []); // 컴포넌트 마운트 시 호출

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
          <CategoryHeader title='ROCK' />
        </div>

        {/* 로딩 상태 처리 */}
        {isLoading ? (
          <div className='text-center py-8'>Loading...</div>
        ) : error ? (
          <div className='text-center text-red-500 py-8'>{error}</div>
        ) : (
          /* 카드 목록 */
          <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
            {cardData.map((card) => (
              <CategoryCard
                key={card.newConcertId} // newConcertId를 키로 사용
                concertId={card.newConcertId} // 그대로 newConcertId 전달
                image={card.posterUrl} // API에서 이미지가 없을 경우 샘플 이미지 사용
                title={card.title}
                name={card.name}
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

export default RockPage;

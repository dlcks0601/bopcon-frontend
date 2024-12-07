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

const PopPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/new-concerts?genre=POP');
        setCardData(response.data);
      } catch (err) {
        console.error(err); // 콘솔에 에러 출력
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchConcerts();
  }, []);
  

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className="w-full max-w-screen-sm relative">
        {/* Global Navigation Bar */}
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <GlobalNavigationBar />
        </div>

        {/* 카테고리 헤더 - 개별 div로 묶어서 여백 제어 */}
        <div className="py-0">
          <CategoryHeader title="POP" />
        </div>

        {/* 카드 목록 */}
        <div className="grid grid-cols-2 gap-4 px-4 mt-[-20px]">
          {cardData.map((card) => (
            <CategoryCard
              key={card.newConcertId} // newConcertId를 키로 사용
              concertId={card.newConcertId} // 그대로 newConcertId 전달
              image={card.posterUrl} // API에서 받은 이미지 경로
              title={card.title} // API에서 받은 제목
              name={card.name}   // API에서 받은 이름
              startDate={card.startDate}   // API에서 받은 날짜
              endDate={card.endDate}   // API에서 받은 날짜
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopPage;

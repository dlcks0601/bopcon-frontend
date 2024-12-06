import React, { useState, useEffect } from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import sampleImg from '@/assets/images/sampleimg1.jpg';
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

const NewPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('/api/new-concerts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

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
          <CategoryHeader title='NEW' />
        </div>

        {/* 로딩 상태 */}
        {loading && <div className='text-center mt-4'>Loading...</div>}

        {/* 에러 상태 */}
        {error && <div className='text-center mt-4 text-red-500'>Error: {error}</div>}

        {/* 카드 목록 */}
        {!loading && !error && cardData.length > 0 ? (
          <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
            {cardData.map((card) => (
              <CategoryCard
                key={card.newConcertId} // newConcertId를 키로 사용
                concertId={card.newConcertId} // 그대로 newConcertId 전달
                image={card.posterUrl} // 데이터가 없을 경우 샘플 이미지 사용
                title={card.title}
                name={card.name}
                startDate={card.startDate}
                endDate={card.endDate}
              />
            ))}
          </div>
        ) : (
          !loading &&
          !error && <div className='text-center mt-4'>No data available.</div>
        )}
      </div>
    </div>
  );
};

export default NewPage;

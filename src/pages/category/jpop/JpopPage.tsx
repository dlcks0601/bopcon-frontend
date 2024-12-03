import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';

interface ConcertCard {
  newConcertId: number; // newConcertId 추가
  posterUrl: string;
  title: string;
  name: string;
  date: string;
}

const JpopPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 호출
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/new-concerts?genre=JPOP');
        setCardData(response.data); // 서버에서 받은 데이터로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      <div className='w-full max-w-screen-sm relative'>
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>

        <div className='py-0'>
          <CategoryHeader title='JPOP' />
        </div>

        {/* 로딩 상태 처리 */}
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
            {cardData.map((card) => (
              <CategoryCard
                key={card.newConcertId} // newConcertId를 키로 사용
                concertId={card.newConcertId} // 그대로 newConcertId 전달
                image={card.posterUrl}
                title={card.title}
                name={card.name}
                date={card.date}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JpopPage;

import React, { useEffect, useState } from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
import axios from 'axios';

interface ConcertCard {
  newConcertId: number; // newConcertId 추가
  posterUrl: string;
  title: string;
  name: string;
  startDate: number[];
  endDate: number[];
}

const HiphopPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(`/api/new-concerts?genre=HIPHOP`);
        setCardData(response.data); // API 응답 데이터를 상태에 저장
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'>Loading...</div>;
  }

  if (error) {
    return <div className='flex justify-center items-center min-h-screen'>Error: {error}</div>;
  }

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      <div className='w-full max-w-screen-sm relative'>
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>
        <div className='py-0'>
          <CategoryHeader title='HIPHOP' />
        </div>
        <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
          {cardData.map((card) => (
            <CategoryCard
              key={card.newConcertId} // newConcertId를 키로 사용
              concertId={card.newConcertId} // 그대로 newConcertId 전달
              image={card.posterUrl}
              title={card.title}
              name={card.name}
              startDate={card.startDate}
              endDate={card.endDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HiphopPage;

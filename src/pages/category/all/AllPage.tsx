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


const AllPage = () => {
  // 상태 정의
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // API 호출
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/new-concerts'); // "all" 장르로 요청
        setCardData(response.data); // 서버에서 받은 데이터 설정
      } catch (err) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        {/* Global Navigation Bar */}
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>

        {/* 카테고리 헤더 */}
        <div className='py-0'>
          <CategoryHeader title='ALL' />
        </div>

        {/* 로딩 상태 */}
        {loading && <p className='text-center mt-4'>로딩 중...</p>}

        {/* 에러 상태 */}
        {error && <p className='text-center text-red-500 mt-4'>{error}</p>}

        {/* 카드 목록 */}
        {!loading && !error && (
          <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
            {cardData.length > 0 ? (
              cardData.map((card) => (
                <CategoryCard
                  key={card.newConcertId} // newConcertId를 키로 사용
                  concertId={card.newConcertId} // 그대로 newConcertId 전달
                  image={card.posterUrl} // 서버에서 받은 이미지가 없으면 기본 이미지 사용
                  title={card.title}
                  name={card.name}
                  date={card.date}
                />
              ))
            ) : (
              <p className='col-span-2 text-center'>콘서트 정보가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPage;

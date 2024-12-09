import React, { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
import { useNavigate } from 'react-router-dom';

interface ConcertCard {
  artistName: ReactNode;
  artistId: string;
  newConcertId: number; // newConcertId 추가
  posterUrl: string;
  title: string;
  name: string;
  startDate: number[];
  endDate: number[];
}

const JpopPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('/api/new-concerts?genre=JPOP');
        // 데이터 정렬
        const latestConcerts = response.data.sort(
          (a: { newConcertId: number }, b: { newConcertId: number }) =>
            b.newConcertId - a.newConcertId
        );
        setCardData(latestConcerts); // 정렬된 데이터로 상태 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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

export default JpopPage;

import React, { ReactNode, useEffect, useState } from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ConcertCard {
  artistId: string;
  artistName: ReactNode;
  newConcertId: number;
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(`/api/new-concerts?genre=HIPHOP`);
        const sortedConcerts = response.data.sort(
          (a: { newConcertId: number }, b: { newConcertId: number }) => b.newConcertId - a.newConcertId
        ); // newConcertId 기준으로 내림차순 정렬
        setCardData(sortedConcerts); // 정렬된 데이터를 상태에 저장
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
          <CategoryHeader title='HIPHOP' />
        </div>
        <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
          {cardData.map((card) => (
            <CategoryCard
              key={card.newConcertId}
              concertId={card.newConcertId}
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
      </div>
    </div>
  );
};

export default HiphopPage;

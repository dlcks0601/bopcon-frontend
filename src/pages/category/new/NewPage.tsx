import React, { useState, useEffect, ReactNode } from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
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

const NewPage = () => {
  const [cardData, setCardData] = useState<ConcertCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('/api/new-concerts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ConcertCard[] = await response.json();

        // 데이터 정렬
        const sortedData = data.sort(
          (a, b) => b.newConcertId - a.newConcertId
        );

        setCardData(sortedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
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
          <CategoryHeader title='NEW' />
        </div>

        {loading && <div className='text-center mt-4'>Loading...</div>}
        {error && <div className='text-center mt-4 text-red-500'>Error: {error}</div>}

        {!loading && !error && cardData.length > 0 ? (
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
        ) : (
          !loading &&
          !error && <div className='text-center mt-4'>No data available.</div>
        )}
      </div>
    </div>
  );
};

export default NewPage;

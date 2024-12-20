import React, { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';
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

const AllPage = () => {
  // 상태 정의
  const [cardData, setCardData] = useState<ConcertCard[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const navigate = useNavigate();

  // API 호출
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/new-concerts'); // "all" 장르로 요청

        // 최신순 정렬
        const sortedData = response.data.sort(
          (a: { newConcertId: number }, b: { newConcertId: number }) =>
            b.newConcertId - a.newConcertId
        );

        setCardData(sortedData); // 정렬된 데이터 설정
      } catch (err) {
        // err가 Error 객체인지 확인 후 처리
        if (err instanceof Error) {
          setError(err.message); // Error 객체에서 message 가져오기
        } else {
          setError('데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.');
        }
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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListCard from '@/components/list-card';
import { dummyConcerts } from '@/constants/dummyConcerts';

interface GlobalListContentsProps {
  title: string;
}

const GlobalListContents: React.FC<GlobalListContentsProps> = ({ title }) => {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState(dummyConcerts); // 초기값으로 더미 데이터 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const handleSeeMoreClick = () => {
    navigate(`/${title.toLowerCase()}`);
  };

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const endpoint =
          title === 'NEW' || title === 'ALL'
            ? '/api/new-concerts'
            : `/api/new-concerts?genre=${title.toUpperCase()}`; // API 경로 설정
        const response = await axios.get(endpoint);
        const latestConcerts = response.data
          .sort(
            (a: { newConcertId: number }, b: { newConcertId: number }) =>
              b.newConcertId - a.newConcertId
          ) // 최신순 정렬
          .slice(0, 10);
        setConcerts(latestConcerts); // API 데이터로 대체
      } catch (error) {
        console.error('Failed to fetch concert data:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchConcerts();
  }, [title]); // title 값이 변경될 때마다 호출

  // 아티스트 이름 클릭 핸들러
  const handleArtistClick = (artistId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중단
    navigate(`/artist/${artistId}`);
  };
  return (
    <div className='flex flex-col w-full mx-auto h-auto py-[8px]'>
      {/* 상단 타이틀과 더보기 */}
      <div className='w-full flex justify-between items-center px-4 py-[18px]'>
        <div
          className='font-bold text-black text-[26px]'
          style={{ fontFamily: 'Agenda One, sans-serif' }}
        >
          {title}
        </div>
        <div
          className='font-medium text-[#8c8c8c] text-[15px] cursor-pointer'
          onClick={handleSeeMoreClick}
        >
          더보기
        </div>
      </div>

      {/* 로딩 상태 처리 */}
      {loading ? (
        <div className='text-center text-gray-500'>로딩 중...</div>
      ) : (
        <div className='flex gap-[25px] overflow-x-auto scrollbar-hide mt-[-4px]'>
          {concerts.map((concert, index) => (
            <div key={index} className='flex-shrink-0'>
              <ListCard
                concertId={concert.newConcertId}
                image={concert.posterUrl}
                title={concert.title}
                name={
                  <span
                    className="text-[#8c8c8c]  cursor-pointer"
                    onClick={(e) => handleArtistClick(concert.artistId, e)}
                  >
                    {concert.artistName}
                  </span>
                }
                startDate={concert.startDate}
                endDate={concert.endDate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalListContents;

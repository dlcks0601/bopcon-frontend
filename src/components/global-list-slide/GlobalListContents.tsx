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
  const handleSeeMoreClick = () => {
    navigate(`/${title.toLowerCase()}`);
  };

  useEffect(() => {
    // 최신 콘서트 데이터를 가져오는 API 요청
    axios
      .get(`/api/new-concerts`)
      .then((response) => {
        const latestConcerts = response.data
          .sort(
            (a: { newConcertId: number }, b: { newConcertId: number }) =>
              b.newConcertId - a.newConcertId
          ) // 최신순 정렬
          .slice(0, 3);
        setConcerts(latestConcerts); // API 데이터로 대체
      })
      .catch((error) => console.error('Failed to fetch concert data:', error));
  }, []); // API 호출

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

      {/* 최신 콘서트 3개의 카드 목록 */}
      <div className='flex gap-[25px] overflow-x-auto scrollbar-hide mt-[-4px]'>
        {concerts.map((concert, index) => (
          <div key={index} className='flex-shrink-0'>
            <ListCard
              concertId={concert.newConcertId}
              image={concert.posterUrl}
              title={concert.title}
              name={concert.krName}
              date={concert.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalListContents;

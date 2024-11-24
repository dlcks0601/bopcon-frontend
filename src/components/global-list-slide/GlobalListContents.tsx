import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListCard from '@/components/list-card';
import { Concert } from '@/models/concert.model'; // Concert 타입 임포트

interface GlobalListContentsProps {
  title: string;
}

const GlobalListContents: React.FC<GlobalListContentsProps> = ({ title }) => {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState<Concert[]>([]);

  const handleSeeMoreClick = () => {
    navigate(`/${title.toLowerCase()}`);
  };

  useEffect(() => {
    // 최신 콘서트 데이터를 가져오는 API 요청
    axios
      .get(`/api/new-concerts`)
      .then((response) => {
        // id 내림차순으로 정렬하고, 상위 3개만 선택
        const latestConcerts = response.data
          .sort(
            (a: { newConcertId: number }, b: { newConcertId: number }) =>
              b.newConcertId - a.newConcertId
          ) // 최신순 정렬
          .slice(0, 3);
        // .reverse();
        setConcerts(latestConcerts);
      })
      .catch((error) => console.error('Failed to fetch concert data:', error));
  }, []); // title에 상관없이 API 호출

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
              name={concert.artistName}
              date={concert.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalListContents;

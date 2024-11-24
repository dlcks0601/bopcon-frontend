import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import BackNavigationBar from '@/components/back-navigation-bar';
import ConcertDetailImg from '@/components/concert-deatail-img';
import GlobalConcertHeader from '@/components/global-concert-header';
import ConcertInfo from '@/components/concert-info';
import GlobalButton from '@/components/global-button';
import SetList from '@/components/set-list';
import GlobalList from '@/components/global-list';
import { Concert } from '@/models/concert.model'; // Concert 모델 임포트

const ConcertPage = () => {
  const navigate = useNavigate();
  const { concertId } = useParams<{ concertId: string }>();
  const [concertData, setConcertData] = useState<Concert | null>(null); // Concert 타입 명시

  useEffect(() => {
    if (concertId) {
      axios
        .get<Concert>(`/api/new-concerts/${concertId}`) // API 요청 후 타입 적용
        .then((response) => setConcertData(response.data))
        .catch((error) => console.error('Error fetching concert data:', error));
    }
  }, [concertId]);

  if (!concertData) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  const goToPastConcertPage = () => {
    navigate('/past-concerts');
  };

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      <div className='w-full max-w-screen-sm relative'>
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <BackNavigationBar />
        </div>
        <ConcertDetailImg posterUrl={concertData.posterUrl} />
        <GlobalConcertHeader
          title={concertData.title}
          subTitle={concertData.subTitle}
          likeId={concertData.newConcertId}
        />
        <ConcertInfo
          date={concertData.date}
          venueName={concertData.venueName}
          cityName={concertData.cityName}
          countryName={concertData.countryName}
          ticketUrl={concertData.ticketUrl}
        />
        <div className='flex justify-around gap-6 mt-6 px-6'>
          <GlobalButton text='아티스트 정보' variant='black' />
          <GlobalButton
            text='지난 공연 셋리스트'
            variant='white'
            onClick={goToPastConcertPage}
          />
        </div>
        <div className='w-full mt-8'>
          <GlobalList title='예상 셋리스트' />
        </div>
        <div className='flex px-3'>
          <SetList />
        </div>
      </div>
    </div>
  );
};

export default ConcertPage;

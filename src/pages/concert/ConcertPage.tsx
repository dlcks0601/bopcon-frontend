import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConcertsStart,
  fetchConcertsSuccess,
  fetchConcertsFailure,
  selectConcert,
} from '@/store/slices/concertSlice';
import { RootState, AppDispatch } from '@/store';
import axios from 'axios';

import BackNavigationBar from '@/components/back-navigation-bar';
import ConcertDetailImg from '@/components/concert-deatail-img';
import GlobalConcertHeader from '@/components/global-concert-header';
import ConcertInfo from '@/components/concert-info';
import GlobalButton from '@/components/global-button';
import SetList from '@/components/set-list';
import GlobalList from '@/components/global-list';

const ConcertPage = () => {
  const navigate = useNavigate();
  const { concertId } = useParams<{ concertId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedConcert, isLoading, error } = useSelector(
    (state: RootState) => state.concerts
  );

  useEffect(() => {
    if (concertId) {
      dispatch(fetchConcertsStart());

      axios
        .get(`/api/new-concerts/${concertId}`)
        .then((response) => {
          dispatch(selectConcert(response.data));
          dispatch(fetchConcertsSuccess([])); // 전체 목록 업데이트 (옵션)
        })
        .catch((err) => {
          dispatch(fetchConcertsFailure(err.message));
        });
    }
  }, [concertId, dispatch]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (!selectedConcert) {
    return <div>콘서트를 찾을 수 없습니다.</div>;
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
        <ConcertDetailImg posterUrl={selectedConcert.posterUrl || ''} />
        <GlobalConcertHeader
          title={selectedConcert.title || ''}
          subTitle={selectedConcert.subTitle || ''}
        />
        <ConcertInfo
          date={selectedConcert.date || ''}
          venueName={selectedConcert.venueName || ''}
          cityName={selectedConcert.cityName || ''}
          countryName={selectedConcert.countryName || ''}
          ticketUrl={selectedConcert.ticketUrl || ''}
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

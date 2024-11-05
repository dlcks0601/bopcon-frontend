import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import ConcertDetailImg from '@/components/concert-deatail-img';
import GlobalHeader from '@/components/global-concert-header';
import ConcertInfo from '@/components/concert-info';
import GlobalButton from '@/components/global-button';
import SetList from '@/components/set-list';
import GlobalList from '@/components/global-list';

const ConcertPage = () => {
  const navigate = useNavigate();

  const goToPastConcertPage = () => {
    navigate('/past-concerts'); // PastConcertPage의 라우트 경로로 이동
  };

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <BackNavigationBar />
        </div>
        <ConcertDetailImg />
        <GlobalHeader />
        <ConcertInfo />

        {/* 버튼 그룹 */}
        <div className='flex justify-around gap-6 mt-6 px-6'>
          <GlobalButton text='아티스트 정보' variant='black' />
          <GlobalButton
            text='지난 공연 셋리스트'
            variant='white'
            onClick={goToPastConcertPage} // 버튼 클릭 시 페이지 이동
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

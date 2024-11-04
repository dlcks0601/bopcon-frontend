import React from 'react';
import BackNavigationBar from '@/components/back-navigation-bar';
import ConcertDetailImg from '@/components/concert-deatail-img';
import GlobalHeader from '@/components/global-header';
import ConcertInfo from '@/components/concert-info';
import GlobalButton from '@/components/global-button';
import SetList from '@/components/set-list';

const Concert = () => {
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
          <GlobalButton
            text='아티스트 정보'
            variant='black' // 검은색 버튼
          />
          <GlobalButton
            text='지난 공연 셋리스트'
            variant='white' // 흰색 버튼
          />
        </div>
        <div className='flex px-3'>
          <SetList />
        </div>
      </div>
    </div>
  );
};

export default Concert;

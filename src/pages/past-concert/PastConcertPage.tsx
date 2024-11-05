import React from 'react';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalSingerHeader from '@/components/global-singer-header';
import GlobalList from '@/components/global-list';
import PastConcertList from '@/components/past-concert-list';

const PastConcertPage = () => {
  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <BackNavigationBar />
        </div>
        <SingerDetailImg />
        <GlobalSingerHeader />
        <div className='w-full mt-4'>
          <GlobalList title='지난 공연' />
        </div>
        <div className='flex px-3'>
          <PastConcertList />
        </div>
      </div>
    </div>
  );
};

export default PastConcertPage;

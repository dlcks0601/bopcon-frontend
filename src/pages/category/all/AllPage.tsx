import React from 'react';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import sampleImg from '@/assets/images/sampleimg1.jpg';
import CategoryHeader from '@/components/category-header';
import CategoryCard from '@/components/category-card';

const AllPage = () => {
  // 샘플 데이터
  const cardData = [
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
    { image: sampleImg, title: 'sample', name: 'name', date: '1111.11.11' },
  ];

  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        {/* Global Navigation Bar */}
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>

        {/* 카테고리 헤더 - 개별 div로 묶어서 여백 제어 */}
        <div className='py-0'>
          <CategoryHeader title='ALL' />
        </div>

        {/* 카드 목록 */}
        <div className='grid grid-cols-2 gap-4 px-4 mt-[-20px]'>
          {cardData.map((card, index) => (
            <CategoryCard
              key={index}
              image={card.image}
              title={card.title}
              name={card.name}
              date={card.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPage;

import  { useState, useEffect } from 'react';
import sliderData from '@/constants/sliderData';

const SliderContents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5초마다 자동 슬라이드 이동
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  // 다음 슬라이드로 이동
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  // 콘서트 게시물로 이동
  const handlePostClick = () => {
    console.log('콘서트 게시물로 이동'); // 실제로는 링크 이동 코드를 여기에 작성
  };

  return (
    <div className='slider-container relative w-full h-[30vh] overflow-hidden'>
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`${
            index === currentIndex ? 'block' : 'hidden'
          } transition-opacity duration-1000 absolute inset-0 w-full h-full bg-cover bg-center`}
          style={{ backgroundImage: `url(${slide.image})` }}
          onClick={handlePostClick} // 슬라이드 클릭 시 게시물 이동
        >
          {/* 그림자 효과 */}
          <div
            className='absolute inset-0'
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 0.21) 60%, rgba(0, 0, 0, 0.7) 100%)',
            }}
          ></div>

          {/* 텍스트 레이어 (반응형) */}
          <div className='absolute bottom-16 left-8 text-white z-10 text-2xl'>
            <h2 className='font-bold'>{slide.title}</h2>
          </div>
        </div>
      ))}

      {/* 왼쪽 구역 (이전 슬라이드) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className='absolute left-0 top-0 h-full w-1/6 z-20 cursor-pointer'
      ></div>

      {/* 오른쪽 구역 (다음 슬라이드) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className='absolute right-0 top-0 h-full w-1/6 z-20 cursor-pointer'
      ></div>
    </div>
  );
};

export default SliderContents;

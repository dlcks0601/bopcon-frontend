import GlobalListContents from '@/components/global-list/global-list';
import GlobalNavigationBar from '@/components/global-navigation-bar';
import SliderContents from '@/components/slider-contents';

const MainPage = () => {
  return (
    <div className='relative bg-white w-full min-h-screen flex justify-center'>
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className='w-full max-w-screen-sm relative'>
        {/* Global Navigation Bar */}
        <div className='relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50'>
          <GlobalNavigationBar />
        </div>

        {/* Slider Contents */}
        <div className='relative z-0'>
          <SliderContents />
        </div>

        {/* GlobalListContents 섹션 */}
        <div className='relative z-0'>
          <GlobalListContents title='NEW' />
          <GlobalListContents title='ALL' />
          <GlobalListContents title='JPOP' />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

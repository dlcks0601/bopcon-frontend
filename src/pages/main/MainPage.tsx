import GlobalNavigationBar from '@/components/global-navigation-bar';

const MainPage = () => {
  return (
    <div className='relative bg-black'>
      {/* Global Navigation Bar */}
      <div className='absolute top-0 left-0 right-0 z-10'>
        <GlobalNavigationBar />
      </div>
    </div>
  );
};

export default MainPage;

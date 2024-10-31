import Menu from '@/assets/icons/menu.svg';
import logo from '@/assets/icons/BOBCONIcon.svg';
import Search from '@/assets/icons/search.svg';

const GlobalNavigationBar = () => {
  return (
    <header className='flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 bg-white'>
      {/* 로고 */}
      <img
        className='w-[80px] h-[25px] sm:w-[90px] sm:h-[30px] md:w-[109px] md:h-[34px]'
        alt='BOBCON Logo'
        src={logo}
      />

      {/* 검색 및 메뉴 아이콘 */}
      <div className='flex w-[120px] sm:w-[130px] md:w-[146px] h-10 sm:h-12 items-center justify-between px-1.5 sm:px-2.5 py-0 relative'>
        <img
          className='w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]'
          alt='Search icon'
          src={Search}
        />
        <img
          className='w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px]'
          alt='Open menu'
          src={Menu}
        />
      </div>
    </header>
  );
};

export default GlobalNavigationBar;

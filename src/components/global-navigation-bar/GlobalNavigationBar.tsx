import Menu from '@/assets/icons/menu.svg';
import logo from '@/assets/icons/BOBCONIcon.svg';
import Search from '@/assets/icons/search.svg';

const GlobalNavigationBar = () => {
  return (
    <header className='flex justify-between items-center px-4 py-2   bg-white'>
      {/* 로고 */}
      <img className='w-[80px] h-[25px]' alt='BOBCON Logo' src={logo} />

      {/* 검색 및 메뉴 아이콘 */}
      <div className='flex w-[90px] h-10 items-center justify-between px-1.5 sm:px-2.5 py-0 relative'>
        <img className='w-[24px] h-[24px]' alt='Search icon' src={Search} />
        <img className='w-[24px] h-[24px] ' alt='Open menu' src={Menu} />
      </div>
    </header>
  );
};

export default GlobalNavigationBar;

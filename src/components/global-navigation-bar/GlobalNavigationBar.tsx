// GlobalNavigationBar.tsx
import { useState } from 'react';
import logo from '@/assets/icons/BOBCONIcon.svg';
import Search from '@/assets/icons/search.svg';
import MenuPage from '@/components/menu'; // 전체 화면을 덮는 메뉴 컴포넌트

const GlobalNavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='flex px-4 justify-between items-center py-2 bg-white relative'>
      <img className='w-[80px] h-[25px]' alt='BOBCON Logo' src={logo} />

      <div className='flex w-[80px] h-10 items-center justify-between py-0 relative'>
        <img className='w-[26px] h-[26px]' alt='Search icon' src={Search} />

        {/* 햄버거 메뉴 아이콘 */}
        <button
          onClick={toggleMenu}
          className='relative w-8 h-8 flex flex-col justify-center items-center space-y-1.5 focus:outline-none'
        >
          <div className='h-[2px] w-6 bg-black rounded-md'></div>
          <div className='h-[2px] w-6 bg-black rounded-md'></div>
          <div className='h-[2px] w-6 bg-black rounded-md'></div>
        </button>

        {/* 전체 화면 덮는 메뉴 페이지 */}
        {isMenuOpen && <MenuPage toggleMenu={toggleMenu} />}
      </div>
    </header>
  );
};

export default GlobalNavigationBar;

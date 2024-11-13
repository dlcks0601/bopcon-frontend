// GlobalNavigationBar.tsx
import { useState } from 'react';
import logo from '@/assets/icons/BOBCONIcon.svg';
import Search from '@/assets/icons/search.svg';
import MenuPage from '@/components/menu'; // 전체 화면을 덮는 메뉴 컴포넌트'
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogoClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <header className='flex px-4 justify-between items-center py-2 bg-white relative'>
      <div className='cursor-pointer' onClick={handleLogoClick}>
        <img className='w-[120px] h-[40px]' alt='BOBCON Logo' src={logo} />
      </div>

      <div className='flex w-[80px] h-10 items-center justify-between py-0 relative'>
        <img className='w-[26px] h-[26px]' alt='Search icon' src={Search} />

        {/* 햄버거 메뉴 아이콘 */}
        <button
          onClick={toggleMenu}
          className='relative w-8 h-8 flex justify-center items-center focus:outline-none'
        >
          <Bars3Icon className='h-8 w-8 text-black' />
        </button>

        {/* 전체 화면 덮는 메뉴 페이지 */}
        {isMenuOpen && <MenuPage toggleMenu={toggleMenu} />}
      </div>
    </header>
  );
};

export default GlobalNavigationBar;

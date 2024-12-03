import { useState } from 'react';
import logo from '@/assets/icons/BOBCONIcon.svg';
import Search from '@/assets/icons/search.svg';
import MenuPage from '@/components/menu';
import SearchPage from '../search';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 메뉴 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 검색창 토글
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // 로고 클릭 시 메인 페이지 이동
  const handleLogoClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <header className="flex px-4 justify-between items-center py-2 bg-white relative">
      {/* 로고 */}
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img className="w-[120px] h-[40px]" alt="BOBCON Logo" src={logo} />
      </div>

      {/* 검색 및 메뉴 아이콘 */}
      <div className="flex w-[80px] h-10 items-center justify-between py-0 relative">
        {/* 검색 아이콘 */}
        <img
          className="w-[26px] h-[26px] cursor-pointer"
          alt="Search icon"
          src={Search}
          onClick={toggleSearch}
        />

        {/* 햄버거 메뉴 아이콘 */}
        <button
          onClick={toggleMenu}
          className="relative w-8 h-8 flex justify-center items-center focus:outline-none"
        >
          <Bars3Icon className="h-8 w-8 text-black" />
        </button>
      </div>

      {/* 검색창 */}
      {isSearchOpen && (
        <>
          {/* 배경 투명도 */}
          <div className="fixed inset-0 bg-black/50 z-10"></div>
          {/* 검색 창 */}
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg">
              <SearchPage toggleSearch={toggleSearch} />
            </div>
          </div>
        </>
      )}

      {/* 메뉴 전체화면 컴포넌트 */}
      {isMenuOpen && <MenuPage toggleMenu={toggleMenu} />}
    </header>
  );
};

export default GlobalNavigationBar;

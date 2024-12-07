// GlobalNavigationBar.tsx
import { useState } from "react";
import logo from "@/assets/icons/BOBCONIcon.svg";
import Search from "@/assets/icons/search.svg";
import MenuPage from "@/components/menu"; // 전체 화면을 덮는 메뉴 컴포넌트'
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogoClick = () => {
    navigate("/"); // 메인 페이지로 이동
  };

  // 검색 페이지 이동
  const goToSearchPage = () => navigate("/search");

  return (
    <header className="flex px-4 justify-between items-center py-2 bg-white relative">
      <div className="cursor-pointer" onClick={handleLogoClick}>
        <img className="w-[120px] h-[40px]" alt="BOBCON Logo" src={logo} />
      </div>

      <div className="flex w-[80px] h-10 items-center justify-between py-0 relative">
        {/* 검색 및 메뉴 아이콘 */}
        <div className="flex items-center space-x-4">
          {/* 검색 아이콘 */}
          <img
            className="w-6 h-6 cursor-pointer"
            alt="Search icon"
            src={Search}
            onClick={goToSearchPage}
          />

          {/* 햄버거 메뉴 버튼 */}
          <button
            className="relative flex items-center justify-center w-8 h-8 focus:outline-none"
            onClick={toggleMenu}
          >
            <Bars3Icon className="h-8 w-8 text-black" />
          </button>
        </div>

        {/* 전체 화면 덮는 메뉴 페이지 */}
        {isMenuOpen && <MenuPage toggleMenu={toggleMenu} />}
      </div>
    </header>
  );
};

export default GlobalNavigationBar;

import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import AvatarIcon from '@/assets/icons/avatar.svg';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Heroicons XMark 아이콘 가져오기

interface MenuPageProps {
  toggleMenu: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();

  // 로그인 페이지로 이동
  const goToLoginPage = () => {
    toggleMenu(); // 메뉴 닫기
    navigate('/login'); // LoginPage로 이동
  };

  return (
    <div
      className='fixed inset-0 bg-white z-50 flex justify-center items-center'
      onClick={toggleMenu} // 배경 클릭 시 메뉴 닫힘
    >
      <div
        className='relative w-full max-w-screen-sm bg-white text-black h-full p-4 overflow-y-auto'
        onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시 닫히지 않음
      >
        {/* X 버튼 */}
        <button
          onClick={toggleMenu}
          className='absolute top-2 right-3 w-10 h-10 flex items-center justify-center focus:outline-none' // 클릭 영역 확대
          aria-label='Close menu'
        >
          <XMarkIcon className='w-8 h-8 text-black' />
        </button>

        {/* 로그인과 아바타 - 메뉴 항목보다 위에 위치 */}
        <div
          className='flex items-center space-x-6 mb-8 mt-10 pl-4 cursor-pointer'
          onClick={goToLoginPage} // 로그인 클릭 시 LoginPage로 이동
        >
          <img src={AvatarIcon} alt='Avatar' className='w-12 h-12' />
          <span className='text-lg font-medium'>로그인</span>
        </div>

        {/* 메뉴 항목 */}
        <nav className='flex flex-col space-y-6 text-2xl font-semibold pl-6'>
          <a href='#' onClick={toggleMenu} className='block'>
            NEW
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            ALL
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            POP
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            ROCK
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            HIPHOP
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            R&B
          </a>
          <a href='#' onClick={toggleMenu} className='block'>
            JPOP
          </a>
        </nav>

        {/* 하단 추가 항목 */}
        <div className='mt-20 text-2xl space-y-6 font-semibold pl-6'>
          <a href='#' onClick={toggleMenu} className='block font-semibold'>
            문의하기
          </a>
          <a href='#' onClick={toggleMenu} className='block font-semibold'>
            서비스 소개
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

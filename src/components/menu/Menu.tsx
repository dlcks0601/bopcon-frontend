import React from 'react';
import AvatarIcon from '@/assets/icons/avatar.svg';

interface MenuPageProps {
  toggleMenu: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ toggleMenu }) => {
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
          className='absolute top-2 right-6 w-10 h-10 flex items-center justify-center focus:outline-none' // 클릭 영역 확대
          aria-label='Close menu'
        >
          {/* X 모양은 버튼 중앙에 작은 크기로 유지 */}
          <div className='relative'>
            <div className='h-[2px] w-6 bg-black rounded-md transform rotate-45 absolute'></div>
            <div className='h-[2px] w-6 bg-black rounded-md transform -rotate-45 absolute'></div>
          </div>
        </button>

        {/* 로그인과 아바타 - 메뉴 항목보다 위에 위치 */}
        <div className='flex items-center space-x-6 mb-8 mt-10 pl-4'>
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

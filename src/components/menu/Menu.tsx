import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 가져오기
import { useDispatch, useSelector } from 'react-redux'; // Redux useDispatch 훅 가져오기
import AvatarIcon from '@/assets/icons/avatar.svg';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Heroicons XMark 아이콘 가져오기
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store';

interface MenuPageProps {
  toggleMenu: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, nickname } = useSelector(
    (state: RootState) => state.auth
  ); // 로그인 상태 가져오기

  // 로그인 페이지로 이동
  const goToLoginPage = () => {
    toggleMenu(); // 메뉴 닫기
    navigate('/login'); // LoginPage로 이동
  };

  // 카테고리 페이지로 이동
  const goToCategoryPage = (category: string) => {
    toggleMenu(); // 메뉴 닫기
    navigate(`/${category.toLowerCase()}`); // 카테고리 페이지로 이동
  };

  // 로그아웃 처리
  const handleLogout = () => {
    dispatch(logout());
    toggleMenu();
    navigate('/');
  };

  return (
    <div
      className='fixed inset-0 bg-white z-50 flex justify-center items-center '
      onClick={toggleMenu} // 배경 클릭 시 메뉴 닫힘
    >
      <div
        className='relative w-full max-w-screen-sm bg-white text-black h-full p-4 overflow-y-auto scrollbar-hide'
        onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시 닫히지 않음
      >
        {/* X 버튼 */}
        <button
          onClick={toggleMenu}
          className='absolute top-2 right-3 w-10 h-10 flex items-center justify-center focus:outline-none'
          aria-label='Close menu'
        >
          <XMarkIcon className='w-8 h-8 text-black' />
        </button>

        {/* 로그인과 아바타 */}
        <div
          className='flex items-center space-x-6 mb-8 mt-10 pl-4 cursor-pointer'
          onClick={isLoggedIn ? undefined : goToLoginPage} // 로그인하지 않은 경우 LoginPage로 이동
        >
          <img src={AvatarIcon} alt='Avatar' className='w-12 h-12' />
          {isLoggedIn ? (
            <span
              className='text-lg font-medium cursor-pointer'
              onClick={() => navigate('/mypage')} // nickname 클릭 시 MyPage로 이동
            >
              {nickname}
            </span>
          ) : (
            <span className='text-lg font-medium'>로그인</span>
          )}
        </div>

        {/* 메뉴 항목 */}
        <nav className='flex flex-col space-y-6 text-2xl font-semibold pl-6'>
          <span
            onClick={() => goToCategoryPage('new')}
            className='block cursor-pointer'
          >
            NEW
          </span>
          <span
            onClick={() => goToCategoryPage('all')}
            className='block cursor-pointer'
          >
            ALL
          </span>
          <span
            onClick={() => goToCategoryPage('pop')}
            className='block cursor-pointer'
          >
            POP
          </span>
          <span
            onClick={() => goToCategoryPage('rock')}
            className='block cursor-pointer'
          >
            ROCK
          </span>
          <span
            onClick={() => goToCategoryPage('hiphop')}
            className='block cursor-pointer'
          >
            HIPHOP
          </span>
          <span
            onClick={() => goToCategoryPage('rnb')}
            className='block cursor-pointer'
          >
            R&B
          </span>
          <span
            onClick={() => goToCategoryPage('jpop')}
            className='block cursor-pointer'
          >
            JPOP
          </span>
        </nav>

        {/* 하단 추가 항목 */}
        <div className='mt-20 text-2xl space-y-6 font-semibold pl-6'>
          <a href='#' onClick={toggleMenu} className='block font-semibold'>
            문의하기
          </a>
          <a href='#' onClick={toggleMenu} className='block font-semibold'>
            서비스 소개
          </a>
          {isLoggedIn && (
            <button onClick={handleLogout} className='block font-semibold'>
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

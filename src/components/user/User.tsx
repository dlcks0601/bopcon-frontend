import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Redux useDispatch, useSelector 가져오기
import { logout } from '@/store/slices/authSlice'; // 로그아웃 액션 가져오기
import userImg from '@/assets/images/user.png';
import exitIcon from '@/assets/icons/exit.svg'; // Exit 아이콘 import
import { RootState } from '@/store'; // RootState 타입 가져오기

const User: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태에서 로그인 여부와 닉네임 가져오기
  const { isLoggedIn, nickname } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // 로그아웃 액션 디스패치
    navigate('/'); // 메인 페이지로 이동
  };

  if (!isLoggedIn) {
    // 로그인이 되어 있지 않다면 아무것도 표시하지 않음
    return null;
  }

  return (
    <header className="flex flex-col justify-center items-center mt-6 py-6 bg-white">
      {/* 사용자 이미지 */}
      <img
        className="w-20 h-20 rounded-full mb-4"
        alt="User Avatar"
        src={userImg}
      />

      {/* 로그인된 사용자 닉네임 */}
      <span className="text-lg font-medium mb-3">{nickname}</span>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="w-10 h-10 focus:outline-none cursor-pointer"
      >
        <img src={exitIcon} alt="Exit" className="w-full h-full" />
      </button>
    </header>
  );
};

export default User;

import { useNavigate } from 'react-router-dom';
import mylogo from '@/assets/icons/mypage.svg';
import behindIcon from '@/assets/icons/behind.svg'; // 뒤로 가기 아이콘 import

const MyNavigationBar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <header className='flex px-4 justify-between items-center mt-2 py-2 bg-white'>
      {/* 뒤로 가기 아이콘 */}
      <button
        onClick={handleBack}
        className='w-8 h-8 focus:outline-none cursor-clickable'
      >
        <img src={behindIcon} alt='뒤로 가기' className='w-full h-full' />
      </button>

      {/* 로고 */}
        <img className='w-[90px] h-[25px] mr-64' alt='mypage Logo' src={mylogo} />
    </header>
  );
};

export default MyNavigationBar;

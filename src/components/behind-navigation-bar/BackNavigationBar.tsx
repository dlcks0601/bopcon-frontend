import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icons/BOBCONIcon.svg'; // 로고 파일 import
import behindIcon from '@/assets/icons/behind.svg'; // 뒤로 가기 아이콘 import

const BackNavigationBar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <header className='flex px-4 justify-between items-center py-2 bg-white'>
      {/* 뒤로 가기 아이콘 */}
      <button onClick={handleBack} className='w-8 h-8 focus:outline-none'>
        <img src={behindIcon} alt='뒤로 가기' className='w-full h-full' />
      </button>

      {/* 로고 */}
      <img className='w-[80px] h-[25px] mr-4' alt='BOBCON Logo' src={logo} />
    </header>
  );
};

export default BackNavigationBar;

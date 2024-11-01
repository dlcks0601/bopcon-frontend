import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icons/BOBCONIcon.svg'; // 로고 파일을 import
import GlobalInput from '../global-input';
import PasswordGuideLines from '../password-guide-lines';

export const JoinForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleLogoClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  const handleSignup = () => {
    setIsLoading(true);
    // 회원가입 처리 로직 추가
    setTimeout(() => {
      setIsLoading(false);
      // 회원가입 성공 후 처리
    }, 2000);
  };

  const validateForm = () => {
    // 폼 유효성 검사 로직 추가
    setIsFormValid(true); // 임시로 true 처리
  };

  return (
    <div className='bg-white flex flex-col justify-center items-center w-full h-screen'>
      <div className='flex flex-col items-center w-full max-w-sm'>
        {/* 로고 영역 */}
        <div className='mb-10 cursor-pointer' onClick={handleLogoClick}>
          <img
            className='w-[150px] h-[80px] object-contain'
            src={logo}
            alt='BOBCON logo'
          />
        </div>

        {/* 이메일 입력 필드 */}
        <div className='w-full mb-4'>
          <GlobalInput
            label='이메일'
            placeholder='이메일을 입력하세요'
            type='email'
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className='w-full mb-4'>
          <GlobalInput
            label='비밀번호'
            placeholder='비밀번호를 입력하세요'
            type='password'
          />
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className='w-full mb-12'>
          <GlobalInput
            label='비밀번호 확인'
            placeholder='비밀번호를 확인하세요'
            type='password'
          />
        </div>

        {/* 비밀번호 가이드라인 */}
        <div className='w-full text-left mb-12'>
          <PasswordGuideLines password={password} />
        </div>

        {/* 회원가입 버튼 */}
        <div className='w-full'>
          <button
            onClick={handleSignup}
            className={`w-full h-[80px] bg-white rounded-full border border-solid border-black flex justify-center items-center text-black text-[15px] font-light tracking-[-0.15px] leading-[18.0px] cursor-pointer transition-colors ${
              isFormValid
                ? 'bg-gray hover:bg-[#727272]'
                : 'bg-black-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '@/assets/icons/BOBCONIcon.svg'; // 로고 파일 import
import GlobalInput from '../global-input';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 페이지로 이동
  const handleJoinClick = () => {
    navigate('/join');
  };

  // 메인 페이지로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  // 로그인 버튼 클릭 시
  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      });

      // accessToken과 refreshToken을 로컬 스토리지에 저장
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('로그인 성공:', response.data);
      navigate('/'); // 로그인 성공 후 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
    }
  };

  return (
      <div className='bg-white flex flex-col justify-center items-center w-full h-screen'>
        <div className='flex flex-col items-center w-full max-w-sm'>
          <div className='mb-10 cursor-pointer' onClick={handleLogoClick}>
            <img className='w-[150px] h-[80px] object-contain' src={logo} alt='BOBCON logo' />
          </div>

            {/* 이메일 입력 필드 */}
            <div className='w-full mb-4'>
                <GlobalInput
                    label='이메일'
                    placeholder='이메일을 입력하세요'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className='w-full mb-12'>
                <GlobalInput
                    label='비밀번호'
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>


          {/* 로그인 버튼 */}
          <div className='w-full'>
            <div
                className='w-full h-[80px] bg-white rounded-full border border-solid border-black flex justify-center items-center cursor-pointer'
                onClick={handleLoginClick}
            >
            <span className='text-black text-[18px] font-normal tracking-[-0.15px] leading-[18.0px]'>
              로그인
            </span>
            </div>
          </div>

          {/* 회원가입 안내 문구 */}
          <div className='w-full flex justify-center items-center mt-14 gap-4'>
          <span className='text-[#a7a7a7] text-[12px] font-normal tracking-[-0.15px] leading-[18.0px]'>
            아직 회원이 아니신가요?
          </span>
            <span
                className='text-black text-[12px] font-light tracking-[-0.15px] leading-[18.0px] cursor-pointer'
                onClick={handleJoinClick}
            >
            이메일 회원가입
          </span>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;

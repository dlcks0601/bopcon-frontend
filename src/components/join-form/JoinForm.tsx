import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/icons/BOBCONIcon.svg';
import GlobalInput from '../global-input';
import PasswordGuideLines from '../password-guide-lines';
import { signup } from '@/apis/auth.api';

export interface JoinProps {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function JoinForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinProps>();

  const handleLogoClick = () => navigate('/'); // 메인 페이지로 이동

  const onSubmit = async (data: JoinProps) => {
    setIsLoading(true);
    try {
      await signup(data); // 회원가입 요청
      alert('회원가입이 완료되었습니다!');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          {/* 이메일 입력 필드 */}
          <div className='w-full mb-4'>
            <GlobalInput
              label='이메일'
              type='email'
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 닉네임 입력 필드 */}
          <div className='w-full mb-4'>
            <GlobalInput
              label='닉네임'
              type='text'
              {...register('nickname', {
                required: '닉네임을 입력하세요.',
                minLength: {
                  value: 3,
                  message: '닉네임은 최소 3자 이상이어야 합니다.',
                },
              })}
            />
            {errors.nickname && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.nickname.message}
              </p>
            )}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className='w-full mb-4'>
            <GlobalInput
              label='비밀번호'
              type='password'
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
                validate: (value) =>
                  value === watch('confirmPassword') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
              onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 입력 필드 */}
          <div className='w-full mb-12'>
            <GlobalInput
              label='비밀번호 확인'
              type='password'
              {...register('confirmPassword', {
                required: '비밀번호를 확인하세요.',
              })}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* 비밀번호 가이드라인 */}
          <div className='w-full text-left mb-12'>
            <PasswordGuideLines password={password} />
          </div>

          {/* 회원가입 버튼 */}
          <div className='w-full'>
            <button
              type='submit'
              className={`w-full h-[80px] bg-white rounded-full border border-solid border-black flex justify-center items-center text-black text-[15px] font-light tracking-[-0.15px] leading-[18.0px] cursor-pointer transition-colors ${
                isLoading ? 'bg-gray-400' : 'hover:bg-gray-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import logo from '@/assets/icons/BOBCONIcon.svg';
import GlobalInput from '../global-input';
import axios from 'axios';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email: data.email,
          password: data.password,
        }
      );
      const { accessToken, user } = response.data; // API에서 token과 user 데이터 가져오기
      dispatch(login({ token: accessToken, user })); // Redux 상태 업데이트
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className='bg-white flex flex-col justify-center items-center w-full h-screen'>
      <div className='flex flex-col items-center w-full max-w-sm'>
        <div className='mb-10 cursor-pointer' onClick={() => navigate('/')}>
          <img
            className='w-[150px] h-[80px] object-contain'
            src={logo}
            alt='BOBCON logo'
          />
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className='w-full'>
          <div className='w-full mb-4'>
            <GlobalInput
              label='이메일'
              type='email'
              {...register('email', { required: '이메일을 입력하세요.' })}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>
          <div className='w-full mb-12'>
            <GlobalInput
              label='비밀번호'
              type='password'
              {...register('password', { required: '비밀번호를 입력하세요.' })}
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='w-full h-[80px] bg-white rounded-full border border-solid border-black flex justify-center items-center text-black text-[18px] font-normal cursor-pointer hover:bg-gray-200'
          >
            로그인
          </button>
        </form>

        <div className='w-full flex justify-center items-center mt-14 gap-4'>
          <span className='text-[#a7a7a7] text-[12px]'>
            아직 회원이 아니신가요?
          </span>
          <span
            className='text-black text-[12px] cursor-pointer'
            onClick={() => navigate('/join')}
          >
            이메일 회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

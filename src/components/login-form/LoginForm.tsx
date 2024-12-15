import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import logo from '@/assets/icons/BOBCONIcon.svg';
import GlobalInput from '../global-input';
import axios from 'axios';

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // 로그인 핸들러
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://bopcon-env-1.eba-t4zkjfm2.ap-northeast-2.elasticbeanstalk.com';

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
         
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const { accessToken, nickname } = response.data;
      console.log('로그인 성공:', { accessToken, nickname }); // 성공 로그
      dispatch(login({ token: accessToken, nickname }));
      console.log('Redux 상태 업데이트 완료'); // Redux 로그

      // 페이지 이동 지연 로그인 확인 위해서 일부러 했음
      setTimeout(() => {
        console.log('페이지 이동');
        // navigate('/');
      }, 100);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('서버 에러:', error.response?.data || error.message);
        alert(
          '로그인 실패: ' + (error.response?.data.message || '서버 문제 발생')
        );
      } else {
        console.error('예상치 못한 에러:', error);
        alert('로그인 실패: 예상치 못한 문제가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 지연 없는 코드
  // const handleLogin = async (data: LoginFormValues) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
  //       email: data.email,
  //       password: data.password,
  //     });
  //     console.log('로그인 응답:', response); // 디버깅용
  //     const { accessToken, nickname } = response.data;
  //     console.log('로그인 성공:', { accessToken, nickname }); // 성공 로그
  //     dispatch(login({ token: accessToken, nickname }));
  //     navigate('/');
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error('서버 에러:', error.response?.data || error.message);
  //       alert(
  //         '로그인 실패: ' + (error.response?.data.message || '서버 문제 발생')
  //       );
  //     } else {
  //       console.error('예상치 못한 에러:', error);
  //       alert('로그인 실패: 예상치 못한 문제가 발생했습니다.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
            {!isLoading && errors.email && (
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

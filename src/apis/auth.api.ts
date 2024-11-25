import { JoinProps } from '@/components/join-form/JoinForm';
import { httpClient } from './http';

// 회원가입 요청
export const signup = async (userData: JoinProps): Promise<void> => {
  try {
    const { status } = await httpClient.post('/api/auth/signup', userData);
    if (status !== 200) {
      throw new Error('회원가입 실패: 서버 응답 상태가 200이 아님');
    }
    console.log('회원가입 성공'); // 성공 로그
  } catch (error) {
    console.error('회원가입 요청 중 에러 발생:', error);
    throw new Error('회원가입 요청에 실패했습니다. 관리자에게 문의하세요.');
  }
};

// 로그인 응답 타입 정의
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nickname: string;
}

// 로그인 요청
export const login = async (data: JoinProps): Promise<LoginResponse> => {
  try {
    const { data: responseData, status } = await httpClient.post<LoginResponse>(
      '/api/auth/login',
      data
    );
    if (status !== 200) {
      throw new Error('로그인 실패: 서버 응답 상태가 200이 아님');
    }
    console.log('로그인 성공:', responseData); // 성공 로그
    return responseData;
  } catch (error) {
    console.error('로그인 요청 중 에러 발생:', error);
    throw new Error('로그인 요청에 실패했습니다. 관리자에게 문의하세요.');
  }
};

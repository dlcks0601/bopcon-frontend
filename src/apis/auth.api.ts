import { JoinProps } from '@/components/join-form/JoinForm';
import { httpClient } from './http';

// 회원가입 요청
export const signup = async (userData: JoinProps) => {
  const response = await httpClient.post('/api/auth/signup', userData);
  return response.data; // 응답 데이터 반환
};

// 로그인 응답 타입 정의
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nickname: string;
}

// 로그인 요청
export const login = async (data: JoinProps): Promise<LoginResponse> => {
  const response = await httpClient.post<LoginResponse>(
    '/api/auth/login',
    data
  );

  return response.data; // 응답 데이터 반환
};

import { JoinProps } from '@/components/join-form/JoinForm';
import { httpClient } from './http';

export const signup = async (userData: JoinProps) => {
  const response = await httpClient.post('/api/auth/signup', userData);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (data: JoinProps) => {
  const response = await httpClient.post<LoginResponse>(
    '/api/auth/login',
    data
  );
  return response.data;
};

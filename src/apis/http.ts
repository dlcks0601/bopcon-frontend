import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, logout, removeToken } from '../store/slices/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://bopcon-env-1.eba-t4zkjfm2.ap-northeast-2.elasticbeanstalk.com';
const DEFAULT_TIMEOUT = 30000;

const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const { data }: AxiosResponse<{ accessToken: string }> = await axios.post(
      `${BASE_URL}/auth/refresh`,
      { refreshToken }
    );
    localStorage.setItem('token', data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    removeToken();
    window.location.href = '/login';
    return null;
  }
};

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken && config.headers) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
        config.headers.set('Content-Type', 'application/json');
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn('401 Unauthorized: 토큰 갱신 또는 로그아웃 처리 중...');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            console.log('토큰 갱신 성공:', newAccessToken);
            error.config.headers = {
              ...error.config.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            return axios(error.config);
          }
        }
        console.log('토큰 갱신 실패. 로그아웃 처리 중...');
        logout();
      }
      console.error('Axios 에러 발생:', error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient({});

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <R = undefined, T = undefined>(
  method: RequestMethod,
  url: string,
  payload?: T
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await (() => {
      switch (method) {
        case 'post':
          return httpClient.post<R>(url, payload);
        case 'get':
          return httpClient.get<R>(url);
        case 'put':
          return httpClient.put<R>(url, payload);
        case 'delete':
          return httpClient.delete<R>(url);
      }
    })();
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
};

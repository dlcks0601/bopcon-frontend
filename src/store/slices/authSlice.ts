import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 네트워크 api 에서 받아오는 payload 참고 후 맞춰서 작성
interface LoginPayload {
  token: string;
  refreshToken?: string;
  nickname: string;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  refreshToken: string | null;
  nickname: string | null;
}

// Helper functions
export const getToken = () => localStorage.getItem('token'); // localStorage에서 토큰 가져오기
export const getRefreshToken = () => localStorage.getItem('refreshToken'); // localStorage에서 리프레시 토큰 가져오기
export const setToken = (token: string) => localStorage.setItem('token', token); // 토큰 저장
export const getNickname = () => localStorage.getItem('nickname'); // 닉네임 가져오기
export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('nickname'); // 로그아웃 시 닉네임도 제거
};

// Initial state
const initialState: AuthState = {
  isLoggedIn: !!getToken(), // 저장된 토큰으로 초기 상태 설정
  token: getToken(),
  refreshToken: getRefreshToken(),
  nickname: getNickname(), // localStorage에서 nickname을 가져옴
};

// Redux Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.nickname = action.payload.nickname; // nickname을 상태에 저장
      setToken(action.payload.token);
      localStorage.setItem('nickname', action.payload.nickname); // nickname도 localStorage에 저장
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.refreshToken = null;
      state.nickname = null; // 로그아웃 시 nickname도 null 처리
      removeToken();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

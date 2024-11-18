import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  nickname: string;
  email: string;
}

interface LoginPayload {
  token: string;
  user: User;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null, // 초기값 설정
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      setToken(action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      removeToken();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

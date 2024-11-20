import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import concertReducer from './slices/concertSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // auth reducer 추가
    concerts: concertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

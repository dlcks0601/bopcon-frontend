import { configureStore } from '@reduxjs/toolkit';
import concertFavoritesReducer from '@/store/slices/concertFavoritesSlice';
import authReducer from '@/store/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: concertFavoritesReducer, // likes로 정의된 상태
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

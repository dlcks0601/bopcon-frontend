import { configureStore } from '@reduxjs/toolkit';
import concertFavoritesReducer from '@/store/slices/concertFavoritesSlice';
import artistFavoritesReducer from '@/store/slices/artistFavoritesSlice';
import authReducer from '@/store/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    concertlikes: concertFavoritesReducer,
    artistlikes: artistFavoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

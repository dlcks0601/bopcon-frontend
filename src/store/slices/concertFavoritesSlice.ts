import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addConcertFavorite as apiAddConcertFavorite,
  deleteConcertFavorite as apiDeleteConcertFavorite,
} from '@/apis/favorites.api';

interface Favorite {
  concert_id: number;
  user_id: number;
}

interface FavoriteResponse {
  favoriteId: number;
  userId: number;
  concertId: number;
  createdAt: string;
}

interface ConcertFavoritesState {
  concertFavorites: Favorite[];
  loading: boolean;
  error: string | null;
}

const initialState: ConcertFavoritesState = {
  concertFavorites: [],
  loading: false,
  error: null,
};

// Thunk: 즐겨찾기 추가
export const addConcertFavorite = createAsyncThunk(
  'concertFavorites/add',
  async (
    { concertId }: { concertId: number },
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as { auth: { token: string | null } };
    const token = auth.token;

    if (!token) {
      return rejectWithValue('로그인이 필요합니다.');
    }

    try {
      const data = await apiAddConcertFavorite({ concertId, token });
      return data; // FavoriteResponse 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || '즐겨찾기 추가 실패');
    }
  }
);

// Thunk: 즐겨찾기 삭제
export const removeConcertFavorite = createAsyncThunk(
  'concertFavorites/remove',
  async (
    { concertId }: { concertId: number },
    { rejectWithValue, getState }
  ) => {
    const { auth } = getState() as { auth: { token: string | null } };
    const token = auth.token;

    if (!token) {
      return rejectWithValue('로그인이 필요합니다.');
    }

    try {
      await apiDeleteConcertFavorite({ concertId, token });
      return concertId; // 성공 시 concertId 반환
    } catch (error: any) {
      return rejectWithValue(error.response?.data || '즐겨찾기 삭제 실패');
    }
  }
);

const concertFavoritesSlice = createSlice({
  name: 'concertFavorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 즐겨찾기 추가
      .addCase(
        addConcertFavorite.fulfilled,
        (state, action: PayloadAction<FavoriteResponse>) => {
          state.loading = false;

          // FavoriteResponse -> Favorite 변환
          const newFavorite: Favorite = {
            concert_id: action.payload.concertId, // 서버 응답에서 변환
            user_id: action.payload.userId,
          };

          state.concertFavorites.push(newFavorite);
        }
      )
      .addCase(addConcertFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addConcertFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // 즐겨찾기 삭제
      .addCase(
        removeConcertFavorite.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.concertFavorites = state.concertFavorites.filter(
            (fav) => fav.concert_id !== action.payload
          );
        }
      )
      .addCase(removeConcertFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeConcertFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default concertFavoritesSlice.reducer;

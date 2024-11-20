import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Concert 데이터 타입 정의
interface Concert {
  id: string;
  posterUrl: string;
  title: string;
  subTitle: string;
  date: string;
  venueName: string;
  cityName: string;
  countryName: string;
  ticketUrl: string;
}

interface ConcertsState {
  concerts: Concert[]; // 전체 콘서트 목록
  selectedConcert: Concert | null; // 특정 콘서트 상세 정보
  isLoading: boolean; // 로딩 상태
  error: string | null; // 에러 메시지
}

const initialState: ConcertsState = {
  concerts: [],
  selectedConcert: null,
  isLoading: false,
  error: null,
};

const concertsSlice = createSlice({
  name: 'concerts',
  initialState,
  reducers: {
    fetchConcertsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchConcertsSuccess(state, action: PayloadAction<Concert[]>) {
      state.concerts = action.payload;
      state.isLoading = false;
    },
    fetchConcertsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectConcert(state, action: PayloadAction<Concert>) {
      state.selectedConcert = action.payload;
    },
  },
});

export const {
  fetchConcertsStart,
  fetchConcertsSuccess,
  fetchConcertsFailure,
  selectConcert,
} = concertsSlice.actions;

export default concertsSlice.reducer;

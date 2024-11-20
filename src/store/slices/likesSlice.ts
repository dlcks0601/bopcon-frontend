import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
  likedConcerts: number[]; // 좋아요한 콘서트 ID 목록
  likedArtists: number[]; // 좋아요한 아티스트 ID 목록
}

const initialState: LikeState = {
  likedConcerts: [],
  likedArtists: [],
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleConcertLike: (state, action: PayloadAction<number>) => {
      const concertId = action.payload;
      if (state.likedConcerts.includes(concertId)) {
        state.likedConcerts = state.likedConcerts.filter(
          (id) => id !== concertId
        );
      } else {
        state.likedConcerts.push(concertId);
      }
    },
    toggleArtistLike: (state, action: PayloadAction<number>) => {
      const artistId = action.payload;
      if (state.likedArtists.includes(artistId)) {
        state.likedArtists = state.likedArtists.filter((id) => id !== artistId);
      } else {
        state.likedArtists.push(artistId);
      }
    },
    setConcertLikes: (state, action: PayloadAction<number[]>) => {
      state.likedConcerts = action.payload;
    },
    setArtistLikes: (state, action: PayloadAction<number[]>) => {
      state.likedArtists = action.payload;
    },
  },
});

export const {
  toggleConcertLike,
  toggleArtistLike,
  setConcertLikes,
  setArtistLikes,
} = likesSlice.actions;
export default likesSlice.reducer;

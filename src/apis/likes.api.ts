import { httpClient } from './http';

// 아티스트 좋아요 추가
export const addArtistLike = async (artistId: number): Promise<void> => {
  try {
    await httpClient.post(`/api/favorites/artist/${artistId}`);
  } catch (error) {
    console.error(`Failed to add like for artist ID ${artistId}:`, error);
    throw error; // 오류를 호출 측으로 전달
  }
};

// 아티스트 좋아요 제거
export const removeArtistLike = async (artistId: number): Promise<void> => {
  try {
    await httpClient.delete(`/api/favorites/artist/${artistId}`);
  } catch (error) {
    console.error(`Failed to remove like for artist ID ${artistId}:`, error);
    throw error; // 오류를 호출 측으로 전달
  }
};

// 콘서트 좋아요 추가
export const addConcertLike = async (concertId: number): Promise<void> => {
  try {
    await httpClient.post(`/api/favorites/concert/${concertId}`);
  } catch (error) {
    console.error(`Failed to add like for concert ID ${concertId}:`, error);
    throw error; // 오류를 호출 측으로 전달
  }
};

// 콘서트 좋아요 제거
export const removeConcertLike = async (concertId: number): Promise<void> => {
  try {
    await httpClient.delete(`/api/favorites/concert/${concertId}`);
  } catch (error) {
    console.error(`Failed to remove like for concert ID ${concertId}:`, error);
    throw error; // 오류를 호출 측으로 전달
  }
};

// 좋아요한 아티스트 목록 가져오기
export const fetchLikedArtists = async (): Promise<number[]> => {
  try {
    const response = await httpClient.get('/api/favorites/artists');
    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error('Failed to fetch liked artists:', error);
    throw error; // 오류를 호출 측으로 전달
  }
};

// 좋아요한 콘서트 목록 가져오기
export const fetchLikedConcerts = async (): Promise<number[]> => {
  try {
    const response = await httpClient.get('/api/favorites/concerts');
    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error('Failed to fetch liked concerts:', error);
    throw error; // 오류를 호출 측으로 전달
  }
};

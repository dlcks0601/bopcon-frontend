import { httpClient } from './http';

// 서버에서 반환하는 Favorite 객체의 타입 정의
interface FavoriteResponse {
  favoriteId: number;
  userId: number;
  concertId: number;
  createdAt: string;
}

// 서버에서 반환하는 성공 메시지의 타입 정의 (예: 삭제 성공)
interface SuccessResponse {
  message: string;
}

// 즐겨찾기 추가
export const addConcertFavorite = async ({
  concertId,
  token,
}: {
  concertId: number;
  token: string;
}): Promise<FavoriteResponse> => {
  if (!token) throw new Error('토큰이 없습니다. 로그인이 필요합니다.');

  try {
    const { data } = await httpClient.post(
      `/api/favorites/concert/${concertId}`,
      undefined, // 본문 데이터 없음
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더에 토큰 추가
        },
      }
    );
    return data; // 서버가 반환하는 Favorite 객체
  } catch (error) {
    console.error('Error adding concert favorite:', error);
    throw new Error('즐겨찾기 추가 요청에 실패했습니다.');
  }
};

// 즐겨찾기 삭제
export const deleteConcertFavorite = async ({
  concertId,
  token,
}: {
  concertId: number;
  token: string;
}): Promise<number> => {
  if (!token) throw new Error('토큰이 없습니다. 로그인이 필요합니다.');

  try {
    await httpClient.delete(`/api/favorites/concert/${concertId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 헤더에 토큰 추가
      },
    });
    return concertId; // 삭제된 콘서트 ID 반환
  } catch (error) {
    console.error('Error deleting concert favorite:', error);
    throw new Error('즐겨찾기 삭제 요청에 실패했습니다.');
  }
};

// 아티스트 즐겨찾기 추가
export const addArtistFavorite = async (
  artistId: number
): Promise<FavoriteResponse> => {
  try {
    const { data } = await httpClient.post(`/api/favorites/artist/${artistId}`);
    return data;
  } catch (error) {
    console.error('Error adding artist favorite:', error);
    throw new Error('아티스트 즐겨찾기 추가 요청에 실패했습니다.');
  }
};

// 아티스트 즐겨찾기 삭제
export const deleteArtistFavorite = async (
  artistId: number
): Promise<SuccessResponse> => {
  try {
    const { data } = await httpClient.delete(
      `/api/favorites/artist/${artistId}`
    );
    return data;
  } catch (error) {
    console.error('Error deleting artist favorite:', error);
    throw new Error('아티스트 즐겨찾기 삭제 요청에 실패했습니다.');
  }
};

// 모든 즐겨찾기 조회
export const getFavorites = async (): Promise<FavoriteResponse[]> => {
  try {
    const { data } = await httpClient.get('/api/favorites');
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('즐겨찾기 조회 요청에 실패했습니다.');
  }
};

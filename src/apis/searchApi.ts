import axios from "axios";

// SearchResult 타입 정의
interface SearchResult {
  newConcertId: number;
  title: string;
  subTitle: string;
  date: string;
  venueName: string;
  cityName: string;
  posterUrl: string;
  artistId: number;
  artistName: string;
  artistkrName: string;
  imgUrl: string;
  snsUrl: string;
  genre: string;
}

const BASE_URL = "http://localhost:8080/api";

// 검색 API 호출 함수
export const fetchSearchResults = async (
  query: string
): Promise<SearchResult[]> => {
  const response = await axios.get(`${BASE_URL}/search?keyword=${query}`);
  return response.data;
};

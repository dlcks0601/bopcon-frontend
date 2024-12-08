import { AxiosResponse } from 'axios';
import { httpClient } from './http';
import { Article } from '@/types/type';

// Article 관련 API 요청 URL
const ARTICLE_API_BASE_URL = '/api/articles';

/**
 * 전체 게시글 가져오기
 * @returns Article 배열
 */
export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const response: AxiosResponse<Article[]> = await httpClient.get(ARTICLE_API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

/**
 * 특정 게시글 조회
 * @param id Article ID
 * @returns Article 데이터
 */
export const getArticleById = async (id: number): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await httpClient.get(`${ARTICLE_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    throw new Error(`Failed to fetch article with ID ${id}`);
  }
};

/**
 * 새로운 게시글 생성
 * @param article 게시글 데이터
 * @param token 인증 토큰
 * @returns 생성된 게시글 데이터
 */
export const createArticle = async (
  article: {
    title: string;
    content: string;
    categoryType: 'FREE_BOARD' | 'NEW_CONCERT';
    artistId: number | null;
    newConcertId: number | null;
  },
  token: string
): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await httpClient.post(ARTICLE_API_BASE_URL, article, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw new Error('Failed to create article');
  }
};


/**
 * 게시글 수정
 * @param id Article ID
 * @param article 업데이트할 게시글 데이터
 * @param token 인증 토큰
 * @returns 업데이트된 게시글 데이터
 */
export const updateArticle = async (
  id: number,
  article: {
    title?: string;
    content?: string;
    categoryType?: 'FREE_BOARD' | 'NEW_CONCERT';
    artistId?: number | null;
    newConcertId?: number | null;
  },
  token: string
): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await httpClient.put(
      `${ARTICLE_API_BASE_URL}/${id}`,
      article,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating article with ID ${id}:`, error);
    throw new Error(`Failed to update article with ID ${id}`);
  }
};

/**
 * 게시글 삭제
 * @param id Article ID
 * @param token 인증 토큰
 */
export const deleteArticle = async (id: number, token: string): Promise<void> => {
  try {
    await httpClient.delete(`${ARTICLE_API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting article with ID ${id}:`, error);
    throw new Error(`Failed to delete article with ID ${id}`);
  }
};

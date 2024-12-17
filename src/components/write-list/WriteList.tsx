/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WriteItem from '../write-item/WriteItem';
import ArticleModal from '../article-modal/ArticleModal'; // ArticleModal import

interface ArticleData {
  post_id: number; // Post ID
  artist_id: number; // Artist ID
  title: string; // 글 제목
  content: string; // 글 내용
  created_at: string; // 생성일
  updated_at?: string; // 수정일 (Optional)
  userName: string; // 사용자 이름
}

const WriteList: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>(); // URL에서 artistId 추출
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null); // 선택된 게시글 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태

  // 날짜 포맷 함수 (예: "2024-11-01T12:30:00Z" -> "2024-11-01 12:30")
  const formatDate = (dateTime: string) => {
    if (!dateTime) {
      return ''; // 유효하지 않으면 빈 문자열 반환
    }

    const [date, time] = dateTime.split('T');
    if (!time) return date; // 시간이 없으면 날짜만 반환
    const [hour, minute] = time.split(':');
    return `${date} ${hour}:${minute}`;
  };

  useEffect(() => {
    if (!artistId) {
      console.error('Artist ID is missing.');
      setError('Artist ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    console.log(`Fetching posts for Artist ID: ${artistId}`); // 디버깅용 로그

    axios
      .get(`/api/articles/artist/${artistId}`) // API 호출
      .then((response) => {
        console.log('Fetched articles:', response.data); // 응답 데이터 확인
        setArticles(response.data); // 상태 업데이트
      })
      .catch((err) => {
        console.error('Failed to fetch articles:', err); // 에러 로그
        setError('Failed to load articles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [artistId]);

  const openModal = (article: ArticleData) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500 py-4">No articles available.</div>;
  }

  // 게시글 3개만 추출
  const articlesToDisplay = articles.slice(0, 10);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {articlesToDisplay.map((article) => (
        <div key={article.post_id} onClick={() => openModal(article)}> {/* 클릭 시 모달 열기 */}
          <WriteItem
            title={article.title} // 글 제목
            content={article.content} // 글 내용
            date={formatDate(article.updated_at || article.created_at)} // 날짜 포맷팅
            nickname={article.userName} // 실제 userName을 사용
          />
        </div>
      ))}

      {/* 모달 열기 */}
      {isModalOpen && selectedArticle && (
        <ArticleModal
        // @ts-expect-error
          article={selectedArticle} // 선택된 게시글 정보 전달
          onClose={closeModal}
          onEdit={() => {}}
          onDelete={() => {}}
          hideEditAndDeleteButtons={true}
        />
      )}
    </div>
  );
};

export default WriteList;

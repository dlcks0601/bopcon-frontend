import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WriteItem from '../write-item/WriteItem';

interface ArticleData {
  post_id: number; // Post ID
  artist_id: number; // Artist ID
  title: string; // 글 제목
  content: string; // 글 내용
  created_at: string; // 생성일
  updated_at?: string; // 수정일 (Optional)
  userName: string; // 사용자 이름
}

interface MyWriteListProps {
  isExpanded: boolean; // 더보기 상태
}

const MyWriteList: React.FC<MyWriteListProps> = ({ isExpanded }) => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 추출
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    if (!id) {
      console.error('ID is missing.');
      setError('ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    console.log(`Fetching articles for ID: ${id}`); // 디버깅용 로그

    axios
      .get(`/api/articles/${id}`) // API 호출
      .then((response) => {
        console.log('Fetched articles:', response.data); // 응답 데이터 확인
        setArticles(response.data); // 상태 업데이트
      })
      .catch((err) => {
        console.error('Failed to fetch articles:', err); // 에러 로그
        setError('Failed to load articles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading articles...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center text-gray-500 py-4">No articles available.</div>;
  }

  // isExpanded에 따라 표시할 데이터 결정
  const visibleArticles = isExpanded ? articles : articles.slice(0, 2);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {visibleArticles.map((article) => (
        <WriteItem
          key={article.post_id} // post_id를 key로 사용
          title={article.title} // 글 제목
          content={article.content} // 글 내용
          date={formatDate(article.updated_at || article.created_at)} // 날짜 포맷팅
          nickname={article.userName} // 실제 userName을 사용
        />
      ))}
    </div>
  );
};

export default MyWriteList;

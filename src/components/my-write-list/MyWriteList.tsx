import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriteItem from '../write-item/WriteItem';
import ArticleModal from '../article-modal/ArticleModal'; // ArticleModal import
import ArticleForm from '../article-form/ArticleForm'; // ArticleForm import
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // Redux 스토어 타입

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
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null); // 선택된 게시글 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태
  const [isEditing, setIsEditing] = useState<boolean>(false); // 수정 모드 상태

  const token = useSelector((state: RootState) => state.auth.token); // Redux에서 token 가져오기

  useEffect(() => {
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`/api/articles/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰만 Authorization 헤더에 추가
        },
      })
      .then((response) => {
        setArticles(response.data); // 상태 업데이트
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch articles:', err); // 에러 로그
        setError('Failed to load articles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [token]); // token이 변경될 때마다 다시 호출

  const handleDelete = async (id: number) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArticles((prevArticles) => prevArticles.filter((article) => article.post_id !== id));
      setIsModalOpen(false);
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleEdit = async (id: number, title: string, content: string) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const updatedArticle = {
        title,
        content,
      };

      const response = await axios.put(`/api/articles/${id}`, updatedArticle, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.post_id === id ? { ...article, ...response.data } : article
        )
      );
      setIsEditing(false);
      setSelectedArticle(null);
      alert('게시글이 수정되었습니다.');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

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

  // isExpanded에 따라 표시할 데이터 결정
  const visibleArticles = isExpanded ? articles : articles.slice(0, 2);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {visibleArticles.map((article) => (
        <div key={article.post_id} onClick={() => openModal(article)}> {/* 클릭 시 모달 열기 */}
          <WriteItem
            title={article.title} // 글 제목
            content={article.content} // 글 내용
            date={""} // 날짜 포맷팅
            nickname={article.userName} // 실제 userName을 사용
          />
        </div>
      ))}

      {/* 모달 열기 */}
      {isModalOpen && selectedArticle && !isEditing && (
        <ArticleModal
          article={selectedArticle} // 선택된 게시글 정보 전달
          onClose={closeModal}
          onEdit={() => setIsEditing(true)} // 수정 모드로 전환
          onDelete={() => handleDelete(selectedArticle.post_id)} // 삭제 핸들러 호출
        />
      )}

      {/* 수정 모드 */}
      {isEditing && selectedArticle && (
        <ArticleForm
          mode="edit"
          initialTitle={selectedArticle.title}
          initialContent={selectedArticle.content}
          onSubmit={(title, content) =>
            handleEdit(selectedArticle.post_id, title, content)
          }
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default MyWriteList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriteItem from '../write-item/WriteItem';
import ArticleModal from '../article-modal/ArticleModal';
import ArticleForm from '../article-form/ArticleForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateArticle, deleteArticle } from '@/apis/articles';

interface ArticleData {
  post_id: number;
  artist_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  userName: string;
  category: 'FREE_BOARD' | 'NEW_CONCERT';
}

interface MyWriteListProps {
  isExpanded: boolean;
}

const MyWriteList: React.FC<MyWriteListProps> = ({ isExpanded }) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);

  // Fetch articles on mount
  useEffect(() => {
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get('/api/articles/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const mappedArticles = response.data.map((article: any) => ({
          ...article,
          post_id: article.id, // Map id to post_id
        }));
        setArticles(mappedArticles);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch articles:', err);
        setError('Failed to load articles. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [token, isCreating, isEditing]);

  const handleDelete = async (id: number) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    try {
      console.log(`Deleting article with ID: ${id}`);
      await deleteArticle(id, token); // `deleteArticle` API 호출
      setArticles((prevArticles) => prevArticles.filter((article) => article.post_id !== id));
      setIsModalOpen(false);
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleEdit = async (
    id: number,
    title: string,
    content: string,
    category: 'FREE_BOARD' | 'NEW_CONCERT'
  ) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      console.log('Editing article with data:', { id, title, content, category });
      await updateArticle(
        id,
        { title, content, categoryType: category, newConcertId: null },
        token
      ); // `updateArticle` API 호출
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.post_id === id ? { ...article, title, content, category } : article
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

  const visibleArticles = isExpanded ? articles : articles.slice(0, 2);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {visibleArticles.map((article) => (
        <div key={article.post_id} onClick={() => openModal(article)}>
          <WriteItem
            title={article.title}
            content={article.content}
            date={''}
            nickname={article.userName}
          />
        </div>
      ))}

      {isModalOpen && selectedArticle && !isEditing && (
        <ArticleModal
          article={selectedArticle}
          onClose={closeModal}
          onEdit={() => setIsEditing(true)}
          onDelete={() => handleDelete(selectedArticle.post_id)}
        />
      )}

      {isEditing && selectedArticle && (
        <ArticleForm
          mode="edit"
          initialTitle={selectedArticle.title}
          initialContent={selectedArticle.content}
          initialCategoryType={selectedArticle.category}
          onSubmit={(title, content, category) =>
            handleEdit(selectedArticle.post_id, title, content, category)
          }
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default MyWriteList;

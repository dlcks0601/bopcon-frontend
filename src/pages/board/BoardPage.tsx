import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store';
import { createArticle, updateArticle, deleteArticle } from '@/apis/articles';
import { Article } from '@/types/type';
import ArticleForm from '@/components/article-form/ArticleForm';
import BackNavigationBar from '@/components/back-navigation-bar';
import ArticleModal from '@/components/article-modal';
import SingerDetailImg from '@/components/singer-detail-img';
import GlobalSingerHeader from '@/components/global-singer-header';
import GlobalList from '@/components/global-list';
import WriteItem from '@/components/write-item';
import axios from 'axios';

const BoardPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [artistData, setArtistData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const { artistId } = useParams<{ artistId: string }>();

  console.log('Current artistId:', artistId); // artistId 확인

  // 아티스트 데이터 가져오기
  useEffect(() => {
    const fetchArtistData = async () => {
      if (!artistId) {
        console.error('Artist ID가 없습니다.');
        return;
      }

      console.log(`Fetching artist data for artistId: ${artistId}`); // 요청 전 로그

      try {
        const response = await axios.get(`/api/artists/${artistId}`);
        console.log('Fetched artist data:', response.data); // 응답 데이터 확인
        setArtistData(response.data);
      } catch (error) {
        console.error('아티스트 데이터 가져오기 실패:', error);
      }
    };

    fetchArtistData();
  }, [artistId]);

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      if (!artistId) {
        console.error('Artist ID가 없습니다.');
        return;
      }

      console.log(`Fetching articles for artistId: ${artistId}`); // 요청 전 로그

      try {
        const response = await axios.get(`/api/articles/artist/${artistId}`);
        console.log('Fetched articles:', response.data); // 응답 데이터 확인
        setArticles(response.data);
      } catch (error) {
        console.error('게시글 목록 가져오기 실패:', error);
      }
    };

    fetchArticles();
  }, [artistId, isCreating, isEditing]);

  // 게시글 삭제
  const handleDeleteArticle = async (id: number) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    try {
      console.log(`Deleting article with ID: ${id}`); // 삭제 전 로그
      await deleteArticle(id, token);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      setSelectedArticle(null);
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 게시글 작성
const handleCreateSubmit = async (
  title: string,
  content: string,
  categoryType: 'FREE_BOARD' | 'NEW_CONCERT',
  artistId: number | null,
  newConcertId: number | null
) => {
  if (!token) {
    alert('로그인이 필요합니다.');
    return;
  }

  console.log('Creating article with data:', {
    title,
    content,
    categoryType,
    artistId,
    newConcertId,
  });

  try {
    await createArticle(
      {
        title,
        content,
        categoryType,
        artistId: artistId ?? 0,
        newConcertId: newConcertId ?? 0,
      },
      token
    );
    setIsCreating(false);
    alert('게시글 작성 완료');
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    alert('게시글 작성에 실패했습니다.');
  }
};


  // 게시글 수정
  const handleEditSubmit = async (
    id: number,
    title: string,
    content: string,
    categoryType: 'FREE_BOARD' | 'NEW_CONCERT',
    newConcertId: number | null
  ) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    console.log('Editing article with ID:', id, {
      title,
      content,
      categoryType,
      newConcertId,
    });

    try {
      await updateArticle(
        id,
        { title, content, categoryType, newConcertId: newConcertId ?? 0 },
        token
      );
      setIsEditing(false);
      setSelectedArticle(null);
      alert('게시글 수정 완료');
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm relative">
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <BackNavigationBar />
        </div>

        <div className="p-6">
          {/* 아티스트 데이터 렌더링 */}
          {artistData && (
            <>
              <SingerDetailImg Img={artistData.imgUrl} /> {/* 이미지 URL 전달 */}
              <GlobalSingerHeader
                krName={artistData.name}
                engName={artistData.krName}
                likeId={artistData.artistId}
              />
            </>
          )}
          <div className="w-full mt-4">
            <GlobalList title="게시판" />
          </div>

          {/* 게시글 생성, 수정, 목록 렌더링 */}
          {isCreating ? (
            <ArticleForm
              mode="create"
              fixedArtistId={parseInt(artistId || '0', 10)} // artistId 전달
              onSubmit={handleCreateSubmit}
              onCancel={() => setIsCreating(false)}
            />
          ) : isEditing && selectedArticle ? (
            <ArticleForm
              mode="edit"
              initialTitle={selectedArticle.title}
              initialContent={selectedArticle.content}
              initialCategoryType={selectedArticle.categoryType}
              fixedArtistId={parseInt(artistId || '0', 10)} // artistId 전달
              initialNewConcertId={selectedArticle.newConcert?.id || null}
              onSubmit={(title, content, categoryType, artistId, newConcertId) =>
              handleEditSubmit(selectedArticle.id, title, content, categoryType, artistId, newConcertId)
            }
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <WriteItem
                  key={article.id}
                  title={article.title}
                  content={article.content}
                  date={""}
                  nickname={article.userName || '익명'}
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>
          )}
          <div className="w-full mx-64">
          <button
            onClick={() => setIsCreating(true)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 "
          >
            글쓰기
          </button>
        </div>
      </div>
      </div>

      {selectedArticle && !isEditing && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onEdit={() => setIsEditing(true)}
          onDelete={() => handleDeleteArticle(selectedArticle.id)}
        />
      )}
    </div>
  );
};

export default BoardPage;

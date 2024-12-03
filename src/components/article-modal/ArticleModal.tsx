import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Article, Comment } from '@/types/type';
import { getCommentsByArticle, deleteComment, updateComment } from '@/apis/comments';
import CommentsSection from '@/components/comment-section/CommentsSection';

interface ModalProps {
  article: Article;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ArticleModal: React.FC<ModalProps> = ({ article, onClose, onEdit, onDelete }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [hasFetchedComments, setHasFetchedComments] = useState<boolean>(false); // 댓글 로딩 여부를 체크하는 상태
  const token = useSelector((state: RootState) => state.auth.token);
  const nickname = useSelector((state: RootState) => state.auth.nickname);

  // 댓글 조회
  useEffect(() => {
    const fetchComments = async () => {
      if (hasFetchedComments) return; // 댓글을 이미 불러온 경우 중복 호출 방지

      try {
        setLoading(true); // 로딩 시작
        console.log('댓글 조회 시작, article.id:', article.id); // API 호출 전 로그
        const data = await getCommentsByArticle(article.id); // 댓글 조회 API 호출
        console.log('받은 댓글 데이터:', data); // 받은 댓글 데이터 로그
        setComments(data);
        setHasFetchedComments(true); // 댓글을 불러왔으므로 상태 업데이트
      } catch (error) {
        console.error('댓글 조회 실패:', error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    if (article.id) {
      fetchComments();
    }
  }, [article.id, hasFetchedComments]); // 의존성 배열에 article.id와 hasFetchedComments 추가

  // 댓글 추가
  const handleAddComment = (comment: Comment) => {
    const commentWithNickname: Comment = { ...comment, nickname: nickname || '' }; // 닉네임 추가 및 타입 맞춤
    console.log('보내는 데이터 (댓글 추가):', commentWithNickname); // 댓글 추가 시 보내는 데이터 로그
    setComments((prev) => [...prev, commentWithNickname]); // 새로운 댓글 추가
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    console.log('삭제할 댓글 ID:', commentId); // 삭제할 댓글 ID 로그
    try {
      if (nickname && token) {
        await deleteComment(commentId, token); // 댓글 삭제 API 호출
        console.log('삭제 완료, 댓글 ID:', commentId); // 삭제 완료 로그
        setComments((prev) => prev.filter((comment) => comment.id !== commentId)); // 상태에서 삭제된 댓글 제거
      } else {
        console.error('로그인된 사용자가 없습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  // 댓글 수정
  const handleUpdateComment = async (commentId: number, updatedContent: string) => {
    console.log('수정할 댓글 ID:', commentId); // 수정할 댓글 ID 로그
    console.log('수정된 내용:', updatedContent); // 수정된 댓글 내용 로그
    try {
      if (nickname && token) {
        await updateComment(commentId, updatedContent, token); // 댓글 수정 API 호출
        console.log('댓글 수정 완료, 댓글 ID:', commentId); // 수정 완료 로그
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, content: updatedContent } : comment
          )
        ); // 상태에서 수정된 댓글 업데이트
      } else {
        console.error('로그인된 사용자가 없습니다.');
      }
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full transition-transform transform scale-95 hover:scale-100 duration-300">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{article.title}</h1>
        <p className="text-sm text-gray-500 mb-6">작성자: {article.userName || '알 수 없음'}</p>
        <p className="text-lg text-gray-700 mb-3">{article.content}</p>

        <div className="mt-6">
          {/* 댓글 섹션 */}
          {loading ? (
            <p>댓글을 로딩 중...</p> // 로딩 중일 때 보여주는 메시지
          ) : (
            <CommentsSection
              articleId={article.id}
              comments={comments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onUpdateComment={handleUpdateComment}
              nickname={nickname}
            />
          )}
        </div>

        <div className="flex justify-end mt-6 gap-4">
          {nickname === article.userName && (
            <>
              <button onClick={onEdit} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                수정
              </button>
              <button onClick={onDelete} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                삭제
              </button>
            </>
          )}

          <button onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;

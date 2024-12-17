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
  hideEditAndDeleteButtons?: boolean; // 수정/삭제 버튼 숨기기 여부
}

const ArticleModal: React.FC<ModalProps> = ({
  article,
  onClose,
  onEdit,
  onDelete,
  hideEditAndDeleteButtons = false, // 기본값 false
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasFetchedComments, setHasFetchedComments] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const nickname = useSelector((state: RootState) => state.auth.nickname);

  // 댓글 조회
  useEffect(() => {
    const fetchComments = async () => {
      if (hasFetchedComments) return;

      try {
        setLoading(true);
        const data = await getCommentsByArticle(article.id) as unknown as Comment[];
        setComments(data);
        setHasFetchedComments(true);
      } catch (error) {
        console.error('댓글 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (article.id) {
      fetchComments();
    }
  }, [article.id, hasFetchedComments]);

  // 댓글 추가
  const handleAddComment = (comment: Comment) => {
    const commentWithNickname: Comment = { ...comment, nickname: nickname || '' };
    setComments((prev) => [...prev, commentWithNickname]);
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    try {
      if (nickname && token) {
        await deleteComment(commentId, token);
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      } else {
        console.error('로그인된 사용자가 없습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  // 댓글 수정
  const handleUpdateComment = async (commentId: number, updatedContent: string) => {
    try {
      if (nickname && token) {
        await updateComment(commentId, updatedContent, token);
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, content: updatedContent } : comment
          )
        );
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
          {loading ? (
            <p>댓글을 로딩 중...</p>
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
          {!hideEditAndDeleteButtons && nickname === article.userName && (
            <>
              <button
                onClick={onEdit}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                수정
              </button>
              <button
                onClick={onDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                삭제
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;

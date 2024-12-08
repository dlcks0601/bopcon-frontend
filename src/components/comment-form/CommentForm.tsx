import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // useSelector 임포트 추가
import { RootState } from '@/store'; // 상태 타입을 가져오는 부분 (이 부분은 프로젝트 설정에 따라 다를 수 있음)
import { addComment } from '@/apis/comments'; // 댓글 추가 API 호출 함수
import { getToken } from '@/store/slices/authSlice'; // 토큰을 가져오는 함수
import { Comment } from '@/types/type'; // Comment 타입

interface CommentFormProps {
  articleId: number;
  onCommentAdded: (newComment: Comment) => void; // 새 댓글을 부모 컴포넌트에 전달하는 콜백 함수
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState<string>(''); // 댓글 내용 상태
  const [error, setError] = useState<string>(''); // 에러 상태
  const nickname = useSelector((state: RootState) => state.auth.nickname); // 로그인된 사용자 닉네임

  // 댓글 추가 함수
  const handleAddComment = async () => {
    if (newComment.trim()) { // 댓글 내용이 비어있는지 확인
      const token = getToken(); // localStorage에서 토큰 가져오기
      if (!token) {
        setError('로그인된 사용자가 없습니다.'); // 토큰이 없으면 에러 메시지 표시
        return;
      }

      // 로그인된 사용자 nickname이 없으면 로그인 유도
      if (!nickname) {
        setError('댓글을 작성하려면 로그인해야 합니다.');
        return;
      }

      try {
        // 댓글 추가 API 호출
        const addedComment = await addComment(articleId, newComment, token);
        onCommentAdded(addedComment); // 부모 컴포넌트에 새 댓글 전달
        setNewComment(''); // 댓글 입력 필드 초기화
        setError(''); // 에러 초기화
      } catch (error) {
        console.error('댓글 추가 실패:', error);
        setError('댓글 추가에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      setError('댓글 내용을 입력하세요!'); // 댓글 내용이 없을 경우 에러 표시
    }
  };

  return (
    <div className="mt-4">
      {error && <div className="text-red-500 mb-2">{error}</div>} {/* 에러 메시지 표시 */}
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="댓글 작성..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)} // 댓글 내용 관리
      />
      <button
        onClick={handleAddComment}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        댓글 추가
      </button>
    </div>
  );
};

export default CommentForm;

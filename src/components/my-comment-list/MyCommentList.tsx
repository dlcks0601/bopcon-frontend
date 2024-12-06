import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriteItem from '../write-item/WriteItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // Redux 스토어 타입

interface CommentData {
  nickname: string;
  comment_id: number; // Comment ID
  post_id: number; // Post ID
  content: string; // 댓글 내용
  created_at: string; // 생성일
  updated_at?: string; // 수정일 (Optional)
}

interface MyCommentListProps {
  isExpanded: boolean; // 더보기 상태
}

const MyCommentList: React.FC<MyCommentListProps> = ({ isExpanded }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token); // Redux에서 token 가져오기

  useEffect(() => {
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`/api/comments/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰만 Authorization 헤더에 추가
        },
      })
      .then((response) => {
        setComments(response.data); // 상태 업데이트
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch comments:', err); // 에러 로그
        setError('Failed to load comments. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [token]); // token이 변경될 때마다 다시 호출

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center text-gray-500 py-4">No comments available.</div>;
  }

  // isExpanded에 따라 표시할 데이터 결정
  const visibleComments = isExpanded ? comments : comments.slice(0, 2);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {visibleComments.map((comment) => (
        <WriteItem
          key={comment.comment_id} // comment_id를 key로 사용
          title={comment.content} // 댓글이 속한 글 ID
          nickname={comment.nickname} // 실제 userName을 사용
          content={''} date={''}        />
      ))}
    </div>
  );
};

export default MyCommentList;

import React, { useEffect, useState } from 'react';
import { getCommentsByArticle, deleteComment, updateComment } from '@/apis/comments';
import { Comment } from '@/types/type';

interface CommentListProps {
  articleId: number;
  token: string;
  onCommentDeleted: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ articleId, token, onCommentDeleted }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정할 댓글 ID
  const [newContent, setNewContent] = useState<string>(''); // 수정할 내용

  useEffect(() => {
    getCommentsByArticle(articleId)
      .then(setComments)
      .catch((error) => console.error('댓글 조회 실패:', error));
  }, [articleId]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId, token)
      .then(() => {
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        onCommentDeleted(commentId); // 부모 컴포넌트에 삭제 알림
      })
      .catch((error) => console.error('댓글 삭제 실패:', error));
  };

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setNewContent(content);
  };

  const handleSaveEdit = (commentId: number) => {
    if (newContent.trim() === '') {
      return;
    }

    updateComment(commentId, newContent, token)
      .then((updatedComment) => {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, content: updatedComment.content } : comment
          )
        );
        setEditingCommentId(null); // 수정 모드 종료
        setNewContent(''); // 입력값 초기화
      })
      .catch((error) => console.error('댓글 수정 실패:', error));
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.author}:</strong>{' '}
          {editingCommentId === comment.id ? (
            <div>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
              <button onClick={() => setEditingCommentId(null)}>취소</button>
            </div>
          ) : (
            <span>{comment.content}</span>
          )}
          <button onClick={() => handleDelete(comment.id)}>삭제</button>
          <button onClick={() => handleEdit(comment.id, comment.content)}>수정</button>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

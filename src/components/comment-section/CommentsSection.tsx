import React, { useState } from 'react';
import { Comment } from '@/types/type';
import CommentForm from '../comment-form/CommentForm';

interface CommentsSectionProps {
  articleId: number;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
  onUpdateComment: (commentId: number, updatedContent: string) => void;
  nickname: string | null;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  articleId,
  comments,
  onAddComment,
  onDeleteComment,
  onUpdateComment,
  nickname,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState<string>('');

  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingCommentContent(content);
  };

  const handleUpdate = () => {
    if (editingCommentContent.trim()) {
      onUpdateComment(editingCommentId as number, editingCommentContent); // 댓글 수정
      setEditingCommentId(null);
      setEditingCommentContent('');
    }
  };

  // 댓글 추가 후 상태 업데이트
  const handleCommentAdded = (newComment: Comment) => {
    onAddComment(newComment); // 부모 컴포넌트에 새 댓글 전달
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      <ul className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="flex justify-between items-center">
              <span>{comment.nickname}: {comment.content}</span>
              <div>
                {/* 댓글 작성자와 로그인된 사용자가 같을 때만 수정/삭제 버튼 표시 */}
                {nickname && nickname === comment.nickname && (
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(comment.id, comment.content)} className="text-yellow-500">
                      수정
                    </button>
                    <button onClick={() => onDeleteComment(comment.id)} className="text-red-500">
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </ul>

      {editingCommentId && (
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={editingCommentContent}
            onChange={(e) => setEditingCommentContent(e.target.value)}
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">
            댓글 수정
          </button>
        </div>
      )}

      <div className="mt-4">
        <CommentForm
          articleId={articleId}
          onCommentAdded={handleCommentAdded} // 댓글 추가 후 상태 업데이트
        />
      </div>
    </div>
  );
};

export default CommentsSection;

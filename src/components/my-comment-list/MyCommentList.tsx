import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // Redux 스토어 타입

interface CommentData {
  nickname: string;
  id: number; // API에서 제공하는 `id`로 변경
  post_id: number;
  content: string;
  created_at: string;
  updated_at?: string;
}

interface MyCommentListProps {
  isExpanded: boolean;
}

const MyCommentList: React.FC<MyCommentListProps> = ({ isExpanded }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState<string>('');

  const token = useSelector((state: RootState) => state.auth.token);

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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Failed to fetch comments:', err);
        setError('Failed to load comments. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleEdit = (id: number, content: string) => {
    setEditingCommentId(id);
    setEditingCommentContent(content);
  };

  const handleUpdate = () => {
    if (editingCommentContent.trim() && editingCommentId !== null) {
      axios
        .put(
          `/api/comments/${editingCommentId}`,
          { content: editingCommentContent },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === editingCommentId
                ? { ...comment, content: editingCommentContent }
                : comment
            )
          );
          setEditingCommentId(null);
          setEditingCommentContent('');
        })
        .catch((err) => {
          console.error('Failed to update comment:', err);
          setError('댓글 수정에 실패했습니다.');
        });
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setComments((prev) => prev.filter((comment) => comment.id !== id));
      })
      .catch((err) => {
        console.error('Failed to delete comment:', err);
        setError('댓글 삭제에 실패했습니다.');
      });
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center text-gray-500 py-4">No comments available.</div>;
  }

  const visibleComments = isExpanded ? comments : comments.slice(0, 2);

  return (
    <div className="w-full mx-auto bg-white mt-4">
      {visibleComments.map((comment) => (
        <div key={comment.id} className="p-4 border-b border-gray-400">
          <div className="flex justify-between items-center">
            <span>{comment.content}</span>
            {editingCommentId === comment.id ? (
              <div>
                <input
                  type="text"
                  value={editingCommentContent}
                  onChange={(e) => setEditingCommentContent(e.target.value)}
                  className="border p-2 rounded-md "
                />
                <button onClick={handleUpdate} className="ml-2 text-black">저장</button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(comment.id, comment.content)} className="text-black">
                  수정 
                </button>
                <button onClick={() => handleDelete(comment.id)} className="text-black">
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCommentList;

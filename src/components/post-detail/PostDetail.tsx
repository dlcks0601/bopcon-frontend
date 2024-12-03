import React, { useEffect, useState } from 'react';
import { Post, Comment } from '@/types/type';
import { getCommentsByArticle, addComment } from '@/apis/comments';

interface PostDetailProps {
  post: Post;
  token: string; // 인증 토큰 추가
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, token, onBack }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  // 댓글 목록 가져오기
  useEffect(() => {
    getCommentsByArticle(post.id)
      .then((data) => setComments(data))
      .catch((error) => console.error('댓글 가져오기 실패:', error));
  }, [post.id]);

  // 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const addedComment = await addComment(post.id, newComment.trim(), token); // token 전달
        setComments((prev) => [...prev, addedComment]); // 상태 업데이트
        setNewComment(''); // 입력 필드 초기화
      } catch (error) {
        console.error('댓글 추가 실패:', error);
      }
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{post.title}</h2>
      <p>{post.content}</p>
      <div className="mt-4">
        <h3 className="font-bold">댓글</h3>
        <ul className="list-disc pl-4">
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2">
              <strong>{comment.author}:</strong> {comment.content}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 작성"
          className="w-full mb-2 p-2 border rounded"
        />
        <button onClick={handleAddComment} className="bg-green-500 text-white p-2 rounded">
          댓글 추가
        </button>
      </div>
      <button onClick={onBack} className="mt-6 bg-gray-500 text-white p-2 rounded">
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default PostDetail;

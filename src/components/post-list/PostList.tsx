import React from 'react';

interface Post {
  id: number;
  title: string;
}

interface PostListProps {
  posts: Post[];
  onSelectPost: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="p-4 border rounded shadow">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectPost(post.id)}
          >
            <h3 className="text-lg font-bold">{post.title}</h3>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

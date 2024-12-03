import React, { useState } from 'react';

interface AllWriteProps {
  onSubmit: (title: string, content: string) => void;
}

const AllWrite: React.FC<AllWriteProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onSubmit(title.trim(), content.trim());
      setTitle('');
      setContent('');
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        className="w-full mb-4 p-2 border rounded"
      ></textarea>
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        작성 완료
      </button>
    </div>
  );
};

export default AllWrite;

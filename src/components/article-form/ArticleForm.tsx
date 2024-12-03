import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ArticleFormProps {
  mode: 'create' | 'edit';
  initialTitle?: string;
  initialContent?: string;
  initialCategoryType?: 'FREE_BOARD' | 'NEW_CONCERT';
  fixedArtistId?: number | null; // Artist ID를 고정하기 위한 prop
  initialNewConcertId?: number | null;
  onSubmit: (
    title: string,
    content: string,
    categoryType: 'FREE_BOARD' | 'NEW_CONCERT',
    artistId: number | null,
    newConcertId: number | null
  ) => void;
  onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  mode,
  initialTitle = '',
  initialContent = '',
  initialCategoryType = 'FREE_BOARD',
  fixedArtistId = null,
  initialNewConcertId = null,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [categoryType, setCategoryType] = useState(initialCategoryType);
  const [newConcertId, setNewConcertId] = useState<number | null>(initialNewConcertId);
  const [concerts, setConcerts] = useState<{ newConcertId: number; title: string }[]>([]);
  const [artistName, setArtistName] = useState<string | null>(null);

  useEffect(() => {
    if (categoryType === 'NEW_CONCERT') {
      // 콘서트 데이터 가져오기
      const fetchConcerts = async () => {
        try {
          const response = await axios.get('/api/new-concerts');
          setConcerts(response.data);
        } catch (error) {
          console.error('Failed to fetch concerts:', error);
        }
      };

      fetchConcerts();
    }
  }, [categoryType]);

  useEffect(() => {
    if (fixedArtistId) {
      // 고정된 아티스트 ID로 아티스트 데이터 가져오기
      const fetchArtist = async () => {
        try {
          const response = await axios.get(`/api/artists/${fixedArtistId}`);
          setArtistName(response.data.name);
        } catch (error) {
          console.error('Failed to fetch artist:', error);
        }
      };

      fetchArtist();
    }
  }, [fixedArtistId]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력하세요.');
      return;
    }
    onSubmit(title.trim(), content.trim(), categoryType, fixedArtistId, newConcertId);
  };

  return (
    <div className="p-9  bg-white ">
      <h2 className="text-md font-bold mb-4">{mode === 'create' ? '글쓰기' : '글 수정'}</h2>

      {fixedArtistId && artistName && (
        <div className="mb-2 p-2 border rounded bg-gray-100">
          <p className="text-sm font-semibold">아티스트</p>
          <p className="text-lg">{artistName}</p>
        </div>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="block w-full mb-2 p-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        className="block w-full mb-2 p-2 border rounded h-32"
      />
      <select
        value={categoryType}
        onChange={(e) => setCategoryType(e.target.value as 'FREE_BOARD' | 'NEW_CONCERT')}
        className="block w-full mb-2 p-2 border rounded"
      >
        <option value="FREE_BOARD">자유게시판</option>
        <option value="NEW_CONCERT">콘서트 게시판</option>
      </select>

      {categoryType === 'NEW_CONCERT' && (
        <select
          value={newConcertId || ''}
          onChange={(e) => setNewConcertId(e.target.value ? Number(e.target.value) : null)}
          className="block w-full mb-2 p-2 border rounded"
        >
          <option value="">콘서트 선택 (선택 사항)</option>
          {concerts.map((concert) => (
            <option key={concert.newConcertId} value={concert.newConcertId}>
              {concert.title}
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {mode === 'create' ? '작성' : '수정'}
        </button>
        <button
          onClick={onCancel}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ArticleForm;

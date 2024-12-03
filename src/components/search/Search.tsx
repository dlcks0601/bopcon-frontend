import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

interface SearchPageProps {
  toggleSearch: () => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ toggleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
      toggleSearch(); // 검색 후 검색창 닫기
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white z-50 flex justify-center items-center"
      onClick={toggleSearch} // 배경 클릭 시 검색창 닫힘
    >
      <div
        className="relative w-full max-w-screen-sm bg-white text-black h-full p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
      >
        
        {/* 닫기 버튼 */}
        <button
          onClick={toggleSearch}
          className="absolute top-2 right-3 w-10 h-10 flex items-center justify-center focus:outline-none"
          aria-label="Close search"
        >
          <XMarkIcon className="w-8 h-8 text-black" />
        </button>

        {/* 검색 입력 */}
        <div className="flex flex-col items-center mt-10">
          <div className="flex w-full items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="border border-gray-300 rounded-md px-4 py-2 flex-1"
            />
            <button
              onClick={handleSearch}
              className="bg-neutral-950 text-white px-6 py-2 rounded-md"
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

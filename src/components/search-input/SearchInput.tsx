import React from "react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, onSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        className="border border-gray-300 rounded-md px-8 py-2 w-full max-w-md"
      />
      <button
        onClick={onSearch}
        className="bg-black text-white px-4 py-2 rounded-md ml-2"
      >
        검색
      </button>
    </div>
  );
};

export default SearchInput;

import React from 'react';

interface MoreButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const MoreButton: React.FC<MoreButtonProps> = ({ isExpanded, onToggle }) => {
  return (
    <div className="px-7 py-2">
      {/* 텍스트 */}
      <div
        className="text-center text-gray-500 text-sm cursor-pointer hover:text-blue-700 mt-3"
        onClick={onToggle}
      >
        {isExpanded ? '접기' : '더보기'}
      </div>
      {/* 선 */}
      <hr className="border-t-1 border-gray-400 mt-5" />
    </div>
  );
};

export default MoreButton;

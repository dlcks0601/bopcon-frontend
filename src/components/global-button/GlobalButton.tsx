// components/GlobalButton.tsx

import React from 'react';

interface GlobalButtonProps {
  text: string;
  variant: 'black' | 'white'; // 버튼 색상 옵션
  onClick?: () => void; // 클릭 핸들러 추가
}

const GlobalButton: React.FC<GlobalButtonProps> = ({
  text,
  variant,
  onClick,
}) => {
  return (
    <button
      onClick={onClick} // 클릭 핸들러 적용
      className={`flex-1 px-4 py-5 rounded-lg font-normal border text-xs ${
        variant === 'black'
          ? 'bg-black text-white border-transparent'
          : 'bg-white text-black border-[#727272]'
      }`}
    >
      {text}
    </button>
  );
};

export default GlobalButton;

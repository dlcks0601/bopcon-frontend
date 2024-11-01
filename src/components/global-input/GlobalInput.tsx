import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 값 변경 핸들러
}

export const GlobalInput = ({
  label,
  placeholder,
  type = 'text',
  onChange,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleInputFocus = () => setIsFocused(true);
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
  };

  return (
    <div className='relative w-full mt-6'>
      {/* 라벨 */}
      <label
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-[#727272] font-sans transition-all duration-200 ease-in-out
                ${
                  isFocused || hasValue
                    ? 'top-1/4 text-xs text-gray-500'
                    : 'text-s'
                }`}
      >
        {label}
      </label>
      {/* 인풋 */}
      <input
        type={type}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={onChange} // 입력 변경 핸들러 추가
        className='w-full h-[70px] px-4 py-2 bg-white rounded-md border-[0.5px] border-solid border-[#000000] text-[#727272] placeholder-transparent focus:outline-none text-xl'
      />
    </div>
  );
};

export default GlobalInput;

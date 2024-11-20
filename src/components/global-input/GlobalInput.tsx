import React, { ForwardedRef, useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'nickname';
}

const GlobalInput = React.forwardRef(
  (
    { label, inputType = 'text', onChange, ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
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
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-[#727272] font-sans transition-all duration-200 ease-in-out ${
            isFocused || hasValue ? 'top-1/4 text-xs text-gray-500' : ''
          }`}
        >
          {label}
        </label>
        {/* 인풋 */}
        <input
          ref={ref}
          type={inputType}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={onChange}
          {...props}
          className='w-full h-[70px] px-4 pt-2 bg-white rounded-md border-[0.5px] border-solid border-[#000000] text-[#727272] placeholder-transparent focus:outline-none text-xl'
        />
      </div>
    );
  }
);

export default GlobalInput;

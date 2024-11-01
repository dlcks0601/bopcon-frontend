import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid'; // 최신 버전 경로

const PasswordGuideLines = ({ password }: { password: string }) => {
  const [guidelines, setGuidelines] = useState({
    length: false,
    specialChar: false,
    repeatedChar: false,
  });

  useEffect(() => {
    const length = password.length >= 8 && password.length <= 15;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const repeatedChar = !/(.)\1{3}/.test(password.replace(/\s/g, '')); // 공백 제거 후 검사

    setGuidelines({
      length,
      specialChar,
      repeatedChar,
    });
  }, [password]);

  const guidelinesData = [
    {
      label: '8자 이상, 15자 이하로 설정해 주세요',
      isValid: guidelines.length,
    },
    {
      label: '특수 문자를 사용해 주세요',
      isValid: guidelines.specialChar,
    },
    {
      label: '동일한 문자가 4번 반복되면 안돼요',
      isValid: guidelines.repeatedChar,
    },
  ];

  return (
    <div className='flex flex-col space-y-2'>
      {guidelinesData.map(({ label, isValid }, index) => (
        <div key={index} className='flex items-center'>
          {password && isValid ? (
            <CheckCircleIcon className='h-5 w-5 text-blue-500' />
          ) : (
            <span className='h-5 w-5 border rounded-full border-gray-700'></span>
          )}
          <span
            className={`ml-2 text-sm ${
              password && isValid ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordGuideLines;

import  { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const PasswordGuideLines = ({ password }: { password: string }) => {
  const [guidelines, setGuidelines] = useState([
    {
      label: '8자 이상, 15자 이하로 설정해 주세요',
      isValid: false,
      check: (password: string) =>
        password.length >= 8 && password.length <= 15,
    },
    {
      label: '특수 문자를 사용해 주세요',
      isValid: false,
      check: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: '동일한 문자가 4번 반복되면 안돼요',
      isValid: false,
      check: (password: string) =>
        !/(.)\1{3}/.test(password.replace(/\s/g, '')),
    },
  ]);

  useEffect(() => {
    setGuidelines((prevGuidelines) =>
      prevGuidelines.map((guideline) => ({
        ...guideline,
        isValid: guideline.check(password),
      }))
    );
  }, [password]);

  return (
    <div className='flex flex-col space-y-2'>
      {guidelines.map(({ label, isValid }, index) => (
        <div key={index} className='flex items-center'>
          {isValid ? (
            <CheckCircleIcon className='h-5 w-5 text-blue-500' />
          ) : (
            <span className='h-5 w-5 border rounded-full border-gray-700'></span>
          )}
          <span
            className={`ml-2 text-sm ${
              isValid ? 'text-teal-600' : 'text-gray-500'
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

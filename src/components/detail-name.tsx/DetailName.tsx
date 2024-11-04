// DetailName.tsx
import React from 'react';

interface DetailNameProps {
  title: string;
  subtitle: string;
}

const DetailName: React.FC<DetailNameProps> = ({ title, subtitle }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-lg font-bold'>{title}</h1>
      <p className='text-sm text-gray-600 py-1'>{subtitle}</p>
    </div>
  );
};

export default DetailName;

import React from 'react';

interface WriteItemProps {
  title: string; // 제목
  content: string; // 내용
  date: string; // 작성 날짜 및 시간
  nickname: string; // 작성자 닉네임
}

const WriteItem: React.FC<WriteItemProps> = ({ title, content, date, nickname }) => {
  return (
    <div className="px-7 py-4 bg-white">
      {/* 제목 */}
      <h2 className="text-lg font-bold">{title}</h2>
      
      {/* 내용 */}
      <p className="text-sm text-gray-700 mt-2">{content}</p>

      {/* 하단 작성 정보 */}
      <div className="flex justify-end items-center text-gray-500 text-sm mt-3">
        {/* date와 nickname을 합쳐서 표시 */}
        <span>{`${date} | ${nickname}`}</span>
      </div>
      <hr className="border-t-1 border-black mt-2" />
    </div>
  );
};

export default WriteItem;

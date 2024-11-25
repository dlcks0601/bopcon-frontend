import React from 'react';

interface SongListItemProps {
  index: number;
  songName: string;
  highlight?: boolean; // 색상 표시 여부 (기본값: false)
}

const SongListItem: React.FC<SongListItemProps> = ({ index, songName, highlight = false }) => {
  const getColor = (rank: number) => {
    if (!highlight) return ''; // 색상을 표시하지 않음
    if (rank === 1) return 'bg-yellow-300'; // 금색
    if (rank === 2) return 'bg-neutral-400'; // 은색
    if (rank === 3) return 'bg-yellow-400'; // 동색
    return ''; // 나머지 색상 없음
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 gap-x-2">
        {/* Index 부분 */}
        <div
          className={`text-[#727272] font-medium px-2 py-1 rounded ${getColor(index)}`}
        >
          {String(index).padStart(2, '0')}
        </div>
        {/* Song name */}
        <div className="flex-grow pl-2 text-sm">{songName}</div>
      </div>
      {/* Separator (highlight가 true일 때만 표시) */}
      {highlight && <hr className="border-t-1 border-gray-400 mt-2 mx-4" />}
    </div>
  );
};

export default SongListItem;

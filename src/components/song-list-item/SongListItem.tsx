import MusicIcon from '@/assets/icons/music.svg'

interface SongListItemProps {
  index: number;
  songName: string;
  rank: number; // 랭킹 횟수
  highlight?: boolean; // 색상 표시 여부 (기본값: false)
  ytLink?: string; // YouTube 링크 (선택적)
  count?: number; // 추가: 재생 횟수
}

const SongListItem: React.FC<SongListItemProps> = ({
  index,
  songName,
  rank,
  highlight = false,
  ytLink,
  count,
}) => {
  const getColor = (rank?: number) => {
    if (!highlight || rank === undefined) return ''; // 색상을 표시하지 않음
    if (rank === 1) return 'bg-yellow-300'; // 금색
    if (rank === 2) return 'bg-neutral-400'; // 은색
    if (rank === 3) return 'bg-yellow-400'; // 동색
    return ''; // 나머지 색상 없음
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 gap-x-2">
        {/* Rank 부분 (rank가 있을 경우에만 표시) */}
        {rank !== undefined && (
          <div
            className={`text-[#727272] font-medium px-2 py-1 rounded ${getColor(rank)}`}
          >
            {String(index).padStart(2, '0')}
          </div>
        )}
        {/* Song name */}
        <div className="flex-grow pl-2 text-sm">{songName}</div>
        {/* YouTube 링크 (아이콘으로 표시, 오른쪽 정렬) */}
        {ytLink && (
          <a
            href={ytLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <img src={MusicIcon} alt="Music Icon" className="w-5 h-5" />
          </a>
        )}
        {/* Count 표시 (count가 있을 경우에만 표시) */}
        {count !== undefined && (
          <div className="flex-shrink-0 text-sm text-gray-500">
            count : {count}
          </div>
        )}
      </div>
      {/* Separator (highlight가 true일 때만 표시) */}
      {highlight && <hr className="border-t-1 border-gray-400 mt-2 mx-4" />}
    </div>
  );
};

export default SongListItem;
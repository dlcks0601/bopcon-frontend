import React from 'react';
import SongListItem from '../song-list-item';
import { songData } from '@/constants/songData';

interface SetListProps {
  highlightRanks?: boolean; // 색상 표시 여부
  count: number; // 표시할 곡의 개수
}

const SetList: React.FC<SetListProps> = ({ highlightRanks = false, count }) => {
  return (
    <div className="w-full mx-auto bg-white mt-4">
      <div className="flex flex-col gap-y-2">
        {songData.slice(0, count).map((song) => (
          <SongListItem
            key={song.index}
            index={song.index}
            songName={song.songName}
            highlight={highlightRanks} // highlightRanks 전달
          />
        ))}
      </div>
    </div>
  );
};

export default SetList;

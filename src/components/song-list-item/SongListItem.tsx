import React from 'react';

interface SongListItemProps {
  index: number;
  songName: string;
}

const SongListItem: React.FC<SongListItemProps> = ({ index, songName }) => {
  return (
    <div className='flex justify-between items-center px-4 py-2 gap-x-2'>
      <div className='text-[#727272] font-medium'>
        {String(index).padStart(2, '0')}
      </div>
      <div className='flex-grow pl-2 text-black text-sm'>{songName}</div>
    </div>
  );
};

export default SongListItem;

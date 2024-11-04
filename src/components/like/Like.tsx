import React, { useState } from 'react';
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Like: React.FC = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button onClick={toggleLike} className='focus:outline-none'>
      {liked ? (
        <HeartSolidIcon className='w-6 h-6 text-red-500' />
      ) : (
        <HeartOutlineIcon className='w-6 h-6 text-black' />
      )}
    </button>
  );
};

export default Like;

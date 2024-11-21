import React from 'react';
import snsIcon from '@/assets/icons/sns.svg';
import spotifyIcon from '@/assets/icons/spotify.svg';

interface SingleLinksProps {
  artistUrls: {
    snsUrl: string; // Instagram 링크
    mediaUrl: string; // Spotify 링크
  };
  imgUrl: string; // 아티스트 이미지 URL
}


const SingleLinks: React.FC<SingleLinksProps> = ({ artistUrls, imgUrl }) => {
  return (
    <div className="flex flex-col items-center py-[30px] px-[50px] bg-white">
      {/* 아티스트 이미지 */}
      <div className="flex-shrink-0 mb-4">
        <img
          src={imgUrl || ''}
          alt="Artist"
          className="w-[300px] h-auto object-cover"
          style={{ width: '400px', height: '400px', objectFit: 'contain'  }}
        />
      </div>

      {/* SNS 링크 */}
      <div className="flex gap-6">
        {/* Instagram */}
        <a
          href={artistUrls.snsUrl || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px]"
        >
          <img src={snsIcon} alt="Instagram" className="w-full h-full object-contain" />
        </a>

        {/* Spotify */}
        <a
          href={artistUrls.mediaUrl || ''}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px]"
        >
          <img src={spotifyIcon} alt="Spotify" className="w-full h-full object-contain" />
        </a>
      </div>
    </div>
  );
};

export default SingleLinks;

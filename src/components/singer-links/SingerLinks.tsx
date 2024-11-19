import React from 'react';
import snsIcon from '@/assets/icons/sns.svg';
import spotifyIcon from '@/assets/icons/spotify.svg';
import sampleImg from '@/assets/images/sampleimg4.png';

interface SingleLinksProps {
  artistUrls: { instagramUrl: string; spotifyUrl: string };
}

const SingleLinks: React.FC<SingleLinksProps> = ({ artistUrls }) => {
  return (
    <div className="flex flex-col items-center py-[30px] px-[50px] bg-white">
      {/* Image */}
      <div className="flex-shrink-0 mb-4">
        <img
          src={sampleImg}
          alt="Concert Detail"
          className="w-[300px] h-auto object-cover "
        />
      </div>

      {/* Icon Links */}
      <div className="flex gap-6">
        {/* Instagram Icon */}
        <a
          href={artistUrls.instagramUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px]"
        >
          <img
            src={snsIcon}
            alt="Instagram"
            className="w-full h-full object-contain"
          />
        </a>

        {/* Spotify Icon */}
        <a
          href={artistUrls.spotifyUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[40px] h-[40px]"
        >
          <img
            src={spotifyIcon}
            alt="Spotify"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
    </div>
  );
};

export default SingleLinks;
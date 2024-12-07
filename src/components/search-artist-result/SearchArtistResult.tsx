import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalList from "@/components/global-list";
import { SearchResult } from "@/pages/search/SearchPage"

interface SearchArtistResultProps {
  artist: SearchResult | null;
  query: string;
}

const SearchArtistResult: React.FC<SearchArtistResultProps> = ({ artist, query }) => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalList title="아티스트" />
      {artist ? (
        <div className="bg-white p-8 py-2 mb-2 flex items-center gap-6">
          <img
            src={artist.imgUrl}
            alt={artist.artistkrName}
            className="w-24 h-24 rounded-md cursor-pointer"
            onClick={() => navigate(`/artist/${artist.artistId}`)}
          />
          <div>
            <h2
              className="text-lg font-bold cursor-pointer hover:underline"
              onClick={() => navigate(`/artist/${artist.artistId}`)}
            >
              {artist.artistkrName}
            </h2>
            <p className="text-gray-500">{artist.artistName}</p>
            <a
              href={artist.snsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              SNS 바로가기
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mb-6">
          ‘{query}’에 대한 아티스트 검색결과 없음
        </p>
      )}
    </>
  );
};

export default SearchArtistResult;

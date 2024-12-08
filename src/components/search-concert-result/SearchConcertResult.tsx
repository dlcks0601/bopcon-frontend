import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalList from "@/components/global-list";
import { SearchResult } from "@/pages/search/SearchPage";

interface SearchConcertResultProps {
  concerts: SearchResult[];
  query: string;
}

const SearchConcertResult: React.FC<SearchConcertResultProps> = ({ concerts, query }) => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalList title="콘서트" />
      {concerts.length > 0 ? (
        <ul className="grid gap-4">
          {concerts.map((concert) => (
            <li
              key={concert.newConcertId}
              className="bg-white p-8 py-2 flex items-center gap-4"
            >
              <img
                src={concert.posterUrl}
                alt={concert.title}
                className="w-20 h-20 rounded-md cursor-pointer"
                onClick={() => navigate(`/concert/${concert.newConcertId}`)}
              />
              <div>
                <h3
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/concert/${concert.newConcertId}`)}
                >
                  {concert.title}
                </h3>
                <p className="text-gray-500 text-sm">{concert.date}</p>
                <p className="text-gray-400 text-sm">{concert.venueName}</p>
                <p className="text-gray-400 text-sm">Genre: {concert.genre}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          ‘{query}’에 대한 콘서트 검색결과 없음
        </p>
      )}
    </>
  );
};

export default  SearchConcertResult;

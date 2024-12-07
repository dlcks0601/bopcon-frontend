import React, { useState } from "react";
import { fetchSearchResults } from "@/apis/searchApi";
import GlobalNavigationBar from "@/components/global-navigation-bar";
import SearchInput from "@/components/search-input";
import SearchArtistResult from "@/components/search-artist-result";
import SearchConcertResult from "@/components/search-concert-result";

// SearchResult 타입 정의
export interface SearchResult {
  newConcertId: number;
  title: string;
  subTitle: string;
  date: string;
  venueName: string;
  cityName: string;
  posterUrl: string;
  artistId: number;
  artistName: string;
  artistkrName: string;
  imgUrl: string;
  snsUrl: string;
  genre: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState<SearchResult | null>(null);
  const [concerts, setConcerts] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setLoading(true);
      setHasSearched(true);
      fetchSearchResults(query.trim())
        .then((data: SearchResult[]) => {
          const removeSpaces = (str: string) => str.replace(/\s+/g, "");
          const queryRegex = new RegExp(removeSpaces(query), "i");

          if (data.length === 0) {
            setArtist(null);
            setConcerts([]);
          } else {
            const firstItem = data[0];
            const isArtistSearch =
              queryRegex.test(removeSpaces(firstItem.artistkrName || "")) ||
              queryRegex.test(removeSpaces(firstItem.artistName || ""));

            if (isArtistSearch) {
              setArtist(firstItem);
              const filteredConcerts = data.filter(
                (item) => item.artistId === firstItem.artistId
              );
              setConcerts(filteredConcerts);
            } else {
              setArtist(null);
              setConcerts(data);
            }
          }
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setError("Failed to fetch search results.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm relative">
        <GlobalNavigationBar />
        <div className="p-8">
          <SearchInput query={query} setQuery={setQuery} onSearch={handleSearch} />

          {loading && <p></p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && hasSearched && (
            <>
              <SearchArtistResult artist={artist} query={query} />
              <SearchConcertResult concerts={concerts} query={query} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

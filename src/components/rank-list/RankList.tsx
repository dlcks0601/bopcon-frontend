import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListItem from '../song-list-item';

interface Song {
  songName: string; // 곡 이름
  rank: number; // 랭킹 횟수
}

interface RankListProps {
  highlightRanks?: boolean; // 색상 표시 여부
  count: number; // 표시할 곡의 개수
  artistId: number; // 아티스트 ID
}

const RankList: React.FC<RankListProps> = ({ highlightRanks = true, count, artistId }) => {
  const [songs, setSongs] = useState<Song[]>([]); // 랭크 리스트 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    if (!artistId) {
      setError('Invalid artist ID.');
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/artists/${artistId}/song-ranking`) // 수정된 백엔드 API 호출
      .then((response) => {
        console.log('Fetched ranklist data:', response.data);
        const data = response.data;

        if (Array.isArray(data)) {
          // 데이터를 배열로 변환
          const songsArray = data.map((song) => ({
            songName: song.title, // title을 songName으로 매핑
            rank: song.count || 0, // count를 rank로 매핑 (기본값 0)
          }));
          setSongs(songsArray);
        } else {
          setError('Invalid data format received from server.');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch ranklist:', err);
        setError('Failed to load ranklist.');
      })
      .finally(() => setLoading(false));
  }, [artistId]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
        Loading ranklist...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No ranklist data available.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white mt-4">
      <div className="flex flex-col gap-y-2">
        {songs.slice(0, count).map((song, index) => (
          <SongListItem
            key={song.songName} // 곡 이름을 고유 key로 사용
            index={index + 1} // 순서 표시
            songName={song.songName} // 곡 이름 전달
            rank={index + 1} // 순위 전달
            highlight={highlightRanks} // highlightRanks 전달
          />
        ))}
      </div>
    </div>
  );
};

export default RankList;

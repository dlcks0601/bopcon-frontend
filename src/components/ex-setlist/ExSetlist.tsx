import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListItem from '../song-list-item'; // SongListItem 컴포넌트 임포트

// Song 데이터 타입 정의
interface Song {
  songTitle: string; // 곡 제목
  songId: number; // 곡 ID
  order: number; // 곡 순서
  ytLink: string | null; // 유튜브 링크 (null 가능)
}

// ExSetlistProps 타입 정의
interface ExSetlistProps {
  newConcertId: number | string; // 동적으로 전달받는 concert ID
}

const ExSetlist: React.FC<ExSetlistProps> = ({ newConcertId }) => {
  const [songs, setSongs] = useState<Song[]>([]); // 셋리스트 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    // 예상 셋리스트 데이터 가져오는 함수
    const fetchSetlist = async () => {
      setLoading(true);
      setError(null); // 이전 에러 상태 초기화
      try {
        const response = await axios.get(`/api/concerts/${newConcertId}/predicted-setlist`); // newConcertId를 사용한 API 호출
        console.log('Fetched setlist data:', response.data);

        if (Array.isArray(response.data)) {
          setSongs(response.data); // 데이터 상태 설정
        } else {
          setError('Invalid data format received from server.');
        }
      } catch (err) {
        console.error('Failed to fetch setlist:', err);
        setError('Failed to load setlist.');
      } finally {
        setLoading(false);
      }
    };

    if (newConcertId) {
      fetchSetlist(); // newConcertId가 있을 때만 데이터 요청
    }
  }, [newConcertId]); // newConcertId 변경 시 다시 호출

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <p>Loading setlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No setlist available.</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <ul className="space-y-4">
        {songs.map((song, index) => (
          <li key={song.songId}>
            <SongListItem
              index={index + 1} // 순서를 index로 표시
              songName={song.songTitle} // 곡 제목
              rank={0} // 기본 rank 값 (서버에서 제공되지 않을 경우 사용)
              ytLink={song.ytLink || undefined} // 유튜브 링크 (null일 경우 undefined로 처리)
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExSetlist;

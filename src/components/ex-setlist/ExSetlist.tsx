import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListItem from '../song-list-item'; // SongListItem 컴포넌트

interface Song {
  title: string; // 곡 제목
  songId: number; // 곡 ID
  order: number; // 곡 순서
  ytLink: string | null; // 유튜브 링크 (null 가능)
}

interface ExSetlistProps {
  artistId: string; // 동적으로 전달받는 artistId
}

const ExSetlist: React.FC<ExSetlistProps> = ({ artistId }) => {
  const [songs, setSongs] = useState<Song[]>([]); // 셋리스트 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const fetchSetlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/setlists/predict/artist/${artistId}`); // artistId를 사용한 API 호출
        console.log('Fetched data:', response.data);

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

    if (artistId) {
      fetchSetlist(); // artistId가 있을 때만 데이터 요청
    }
  }, [artistId]); // artistId 변경 시 다시 호출

  if (loading) {
    return <div>Loading setlist...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (songs.length === 0) {
    return <div>No setlist available.</div>;
  }

  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.songId}>
            <SongListItem
              index={song.order} // order를 index로 매핑
              songName={song.title} // title을 songName으로 매핑
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExSetlist;

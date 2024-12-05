import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListItem from '../song-list-item';

interface Song {
  order: number;
  songName: string;
}

interface SetListProps {
  artistId: number; // 상위 컴포넌트에서 artistId를 전달받음
}

const SetList: React.FC<SetListProps> = ({ artistId }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) {
      setError('Artist ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/artists/${artistId}/past-setlists`) // 수정된 엔드포인트 사용
      .then((response) => {
        if (response.data && Array.isArray(response.data.setlist)) {
          setSongs(response.data.setlist);
        } else {
          setError('Invalid data format received from server.');
        }
      })
      .catch(() => {
        setError('Failed to load setlist.');
      })
      .finally(() => setLoading(false));
  }, [artistId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (songs.length === 0)
    return (
      <div style={{ textAlign: 'center', padding: '170px' }}>
        예상 셋리스트가 준비되어있지 않습니다.
        <br />
        죄송합니다.
      </div>
    );

  return (
    <ul>
      {songs.map((song) => (
        <SongListItem key={song.order} index={song.order} songName={song.songName} rank={0} />
      ))}
    </ul>
  );
};

export default SetList;

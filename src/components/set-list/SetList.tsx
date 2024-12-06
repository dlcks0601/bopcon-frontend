import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongListItem from '../song-list-item';

interface Song {
  order: number;
  songName: string;
}

interface SetListProps {
  artistId: number; // 상위 컴포넌트에서 artistId를 전달받음
  pastConcertId: number; // 특정 콘서트 ID를 받음
}

const SetList: React.FC<SetListProps> = ({ artistId, pastConcertId }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId || !pastConcertId) {
      setError('Artist ID or Concert ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/artists/${artistId}/past-concerts`) // 수정된 엔드포인트 사용
      .then((response) => {
        const concerts = response.data; // API 응답 데이터
        const concert = concerts.find(
          (c: any) => c.pastConcertId === pastConcertId
        );

        if (concert && concert.setlists) {
          const formattedSongs = concert.setlists.map((setlist: any) => ({
            order: setlist.order,
            songName: setlist.song.title,
          }));
          setSongs(formattedSongs);
        } else {
          setError('Setlist data not found for this concert.');
        }
      })
      .catch(() => {
        setError('Failed to load setlist.');
      })
      .finally(() => setLoading(false));
  }, [artistId, pastConcertId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (songs.length === 0)
      return (
          <div style={{ textAlign: 'center', padding: '170px' }}>
              {/* 첫 번째 줄의 크기를 키움 */}
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                  아직 업데이트되지 않았어요.
              </div>
              {/* setlist.fm을 링크로 변경 */}
              <div>
                  <a
                      href="https://www.setlist.fm"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007BFF', textDecoration: 'underline' }}
                  >
                      setlist.fm
                  </a>{' '}
                  에서 직접 추가해보세요.
              </div>
          </div>
      );

  return (
    <ul>
      {songs.map((song, idx) => (
        <SongListItem
          key={song.order} // 여전히 고유 키는 `order` 사용
          index={idx + 1} // 여기에서 순서를 임의로 1부터 지정
          songName={song.songName}
          rank={0}
        />
      ))}
    </ul>
  );
};

export default SetList;

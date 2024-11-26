import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SongListItem from '../song-list-item';

interface Song {
  order: number;
  songName: string;
}

interface SetListProps {
  onArtistIdChange: (artistId: number) => void; // artistId를 상위로 전달
}

const SetList: React.FC<SetListProps> = ({ onArtistIdChange }) => {
  const { pastconcertId } = useParams<{ pastconcertId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pastconcertId) {
      setError('Past Concert ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/setlists/past-concert/${pastconcertId}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.setlist)) {
          setSongs(response.data.setlist);

          // artistId 추출 및 전달
          if (response.data.artistId) {
            onArtistIdChange(response.data.artistId);
          }
        } else {
          setError('Invalid data format received from server.');
        }
      })
      .catch(() => {
        setError('Failed to load setlist.');
      })
      .finally(() => setLoading(false));
  }, [pastconcertId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (songs.length === 0) return <div>No songs available</div>;

  return (
    <ul>
      {songs.map((song) => (
        <SongListItem key={song.order} index={song.order} songName={song.songName} rank={0} />
      ))}
    </ul>
  );
};

export default SetList;

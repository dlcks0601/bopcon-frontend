import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SongListItem from '../song-list-item';

interface Song {
  order: number;
  songName: string;
}

const SetList: React.FC = () => {
  const { pastconcertId } = useParams<{ pastconcertId: string }>(); // URL에서 pastconcertId 추출
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
        if (Array.isArray(response.data)) {
          setSongs(response.data);
        } else {
          setError('Invalid data format received from server.');
        }
      })
      .catch(() => {
        setError('Failed to load setlist.');
      })
      .finally(() => setLoading(false));
  }, [pastconcertId]);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
        Loading setlist...
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
        No setlist available for this concert.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white mt-4">
      <ul className="list-none">
        {songs.map((song) => (
          <SongListItem key={song.order} index={song.order} songName={song.songName} />
        ))}
      </ul>
    </div>
  );
};

export default SetList;

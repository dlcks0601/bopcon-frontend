import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PastConcertItem from '../past-concert-item';

interface PastConcertData {
  pastConcertId: number;
  date: string;
  cityName: string;
  country: string;
  venueName: string;
}

interface PastConcertListProps {
  artistName: string;
  isExpanded: boolean;
}

const PastConcertList: React.FC<PastConcertListProps> = ({ artistName, isExpanded }) => {
  const [data, setData] = useState<PastConcertData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => dateString.split('T')[0];

  useEffect(() => {
    if (!artistName) {
      console.error('Artist name is missing.');
      return;
    }

    setLoading(true);

    axios
      .get(`/api/past-concerts/artist/${artistName}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch past concerts:', err);
        setError('Unable to load the past concerts. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [artistName]);

  if (loading) {
    return <div className="text-center py-4">Loading past concerts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-4">No past concerts available.</div>;
  }

  const itemsToShow = isExpanded ? data.length : 4;

  return (
    <div className="w-full">
      {data.slice(0, itemsToShow).map((past) => (
        <div
          key={past.pastConcertId}
          onClick={() => navigate(`/setlist/${past.pastConcertId}`)}
          className="cursor-pointer"
        >
          <PastConcertItem
            date={formatDate(past.date)}
            location={`${past.cityName}`}
            description={past.venueName}
          />
        </div>
      ))}
    </div>
  );
};

export default PastConcertList;

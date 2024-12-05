import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PastConcertItem from '../past-concert-item';

interface PastConcertData {
  pastConcertId: string; // ID가 string 타입으로 변경
  date: string; // 날짜는 string으로 통일
  cityName: string; // 도시 이름
  country: string; // 국가
  venueName: string; // 공연장 이름
}

interface PastConcertListProps {
  artistId: string;
  isExpanded: boolean;
}

const PastConcertList: React.FC<PastConcertListProps> = ({ artistId, isExpanded }) => {
  const [data, setData] = useState<PastConcertData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!artistId) {
      console.error('Artist ID is missing.');
      return;
    }

    const fetchPastConcertData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/artists/${artistId}/past-concerts`);
        console.log('API response data:', response.data);

        const data = response.data;

        if (Array.isArray(data)) {
          const formattedData = data.map((item: any) => ({
            pastConcertId: item.pastConcertId, // ID 필드
            date: item.date, // 날짜 필드
            cityName: item.cityName || item.city, // 도시 이름
            country: item.country, // 국가
            venueName: item.venueName || 'Unknown Venue', // 공연장 이름
          }));
          setData(formattedData);
        } else {
          console.error('Unexpected data format:', data);
          setData([]);
        }
      } catch (error) {
        console.error('Failed to fetch past concerts:', error);
        setError('Unable to load the past concerts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPastConcertData();
  }, [artistId]);

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
          onClick={() => navigate(`/artist/${artistId}/setlist/${past.pastConcertId}`)} // pastConcertId 사용
          className="cursor-pointer"
        >
          <PastConcertItem
            date={past.date}
            location={past.cityName}
            description={past.venueName}
          />
        </div>
      ))}
    </div>
  );
};

export default PastConcertList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NowConcertItem from '../now-concert-item/NowConcertItem';

interface ConcertData {
  endDate: number[]; // 공연 종료 날짜
  startDate: number[]; // 공연 시작 날짜
  date: string; // 공연 날짜
  name: string; // 공연 부제목 (subTitle)
  newConcertId: string; // concert ID
}

interface ApiResponse {
  startDate: number[];
  endDate: number[];
  title: string;
  newConcertId: string;
  date?: string;
}

const NowConcertList: React.FC = () => {
  const [concerts, setConcerts] = useState<ConcertData[]>([]); // 콘서트 데이터 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { artistId } = useParams<{ artistId: string }>(); // URL에서 artistId 가져오기
  const navigate = useNavigate(); // useNavigate로 라우팅 기능 추가

  useEffect(() => {
    if (!artistId) {
      setError('Artist ID is missing.');
      setLoading(false);
      return;
    }

    const fetchConcertData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<ApiResponse[]>(`/api/artists/${artistId}/concerts`);
        console.log('API response data:', response.data); // 데이터 확인

        const data = response.data;

        const formattedData: ConcertData[] = data.map((item) => ({
          startDate: item.startDate,
          endDate: item.endDate,
          name: item.title,
          newConcertId: item.newConcertId,
          date: item.date || '', // date 속성 추가 (없다면 빈 문자열로 처리)
        }));
        setConcerts(formattedData);
      } catch (error) {
        console.error('Failed to fetch concerts:', error);
        setError('Failed to load concert data.');
      } finally {
        setLoading(false);
      }
    };

    fetchConcertData();
  }, [artistId]);

  const handleItemClick = (newConcertId: string) => {
    navigate(`/concert/${newConcertId}`); // newConcertId 기반으로 라우팅
  };

  if (loading) {
    return <div className="text-center text-gray-500 py-4">Loading concerts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (concerts.length === 0) {
    return <div className="text-center text-gray-500 py-4">No concerts available.</div>;
  }

  return (
    <div className="w-full space-y-4">
      {concerts.map((concert, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => handleItemClick(concert.newConcertId)} // 클릭 이벤트에서 newConcertId 사용
        >
          <NowConcertItem startDate={concert.startDate} endDate={concert.endDate} name={concert.name} />
        </div>
      ))}
    </div>
  );
};

export default NowConcertList;

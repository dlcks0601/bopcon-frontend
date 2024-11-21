import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NowConcertItem from '../now-concert-item/NowConcertItem';

interface NowConcertListProps {
  artistId: number; // API 요청에 필요한 artistId
}

interface ConcertData {
  id: number;
  date: string;
  location?: string;
  name?: string;
  description?: string;
}

const NowConcertList: React.FC<NowConcertListProps> = ({ artistId }) => {
  const [data, setData] = useState<ConcertData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get(`/api/new-concerts/${artistId}`) // artistId를 경로에 포함
      .then((response) => {
        console.log('API response data:', response.data); // 응답 데이터 확인
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching concerts:', err);
        setError('Failed to load concerts.');
        setLoading(false);
      });
  }, [artistId]);

  // 클릭 핸들러
  const handleItemClick = (id: number) => {
    navigate(`/concert/${id}`);
  };

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">
        Loading concerts...
      </div>
    );
  }

  // 에러 메시지 표시
  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    );
  }

  // 데이터가 없을 경우 메시지 표시
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No concerts available.
      </div>
    );
  }

  // 데이터 렌더링
  return (
    <div className="w-full">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item.id)}
          className="cursor-pointer"
        >
          <NowConcertItem
            date={item.date}
            name={item.subTitle} // name 포함
          />
        </div>
      ))}
    </div>
  );
};

export default NowConcertList;

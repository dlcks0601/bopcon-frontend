import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import PastConcertList from '@/components/past-concert-list';
import GlobalSingerHeader from '@/components/global-singer-header';

const PastConcertPage = () => {
  const { artistId } = useParams<{ artistId: string }>(); // URL에서 artistId 추출
  const [artistData, setArtistData] = useState<{
    artistId: number; imgUrl: string; name: string; krName: string; mbid: string 
} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [,setIsPastConcertExpanded] = useState(false); // 상태 변수 올바르게 정의

  useEffect(() => {
    if (!artistId) {
      setError('Artist ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(`/api/artists/${artistId}`) // artistId 기반 API 호출
      .then((response) => setArtistData(response.data))
      .catch((err) => {
        console.error('Failed to fetch artist data:', err);
        setError('Failed to load artist data.');
      })
      .finally(() => setLoading(false));
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (!artistData || !artistId) {
    return (
      <div className="text-center text-gray-500 py-4">No artist data available.</div>
    );
  }

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      {/* 최대 너비 640px로 고정되는 내부 컨테이너 */}
      <div className="w-full max-w-screen-sm relative">
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <BackNavigationBar />
        </div>
        <SingerDetailImg Img={artistData.imgUrl} /> {/* 이미지 URL 전달 */}
        <GlobalSingerHeader krName={artistData.name} engName={artistData.krName} likeId={artistData.artistId} /> {/* 이름 데이터 전달 */}
        <div className="w-full mt-4">
          <GlobalList title="지난 공연" />
        </div>
        <div className="flex px-3">
          <PastConcertList artistId={artistId} isExpanded={setIsPastConcertExpanded} /> {/* 상태 변수 전달 */}
        </div>
      </div>
    </div>
  );
};

export default PastConcertPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import GlobalSingerHeader from '@/components/global-singer-header';
import axios from 'axios';

const SetListPage = () => {
  const { pastconcertId } = useParams<{ pastconcertId: string }>();

  // artistId 및 artistData 상태 관리
  const [artistId, setArtistId] = useState<number | null>(null);
  const [artistData, setArtistData] = useState<{
    imgUrl: string;
    name: string;
    krName: string;
  } | null>(null);

  // artistId가 변경되면 artistData를 가져오는 로직 추가
  React.useEffect(() => {
    if (artistId) {
      // 예시: artistId로 artistData를 가져오는 API 요청
      axios.get(`/api/artists/${artistId}`).then((response) => {
        setArtistData({
          imgUrl: response.data.imgUrl,
          name: response.data.name,
          krName: response.data.krName,
        });
      });
    }
  }, [artistId]);

  if (!pastconcertId) {
    return (
      <div className="text-center text-red-500 py-4">
        Past concert ID is missing.
      </div>
    );
  }

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm relative">
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <BackNavigationBar />
        </div>
        {artistData ? (
          <>
            <SingerDetailImg Img={artistData.imgUrl} />
            <GlobalSingerHeader krName={artistData.krName} engName={artistData.name}  />
          </>
        ) : (
          <div>Loading artist data...</div>
        )}
        <div className="w-full mt-4 ">
          <GlobalList title="셋리스트" />
        </div>
        <div className="flex px-4">
          <SetList onArtistIdChange={setArtistId} />
        </div>
      </div>
    </div>
  );
};

export default SetListPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import GlobalSingerHeader from '@/components/global-singer-header';
import axios from 'axios';

const SetListPage = () => {
  const { pastconcertId } = useParams<{ pastconcertId: string }>();

  // 상태 관리
  const [artistId, setArtistId] = useState<number | null>(null);
  const [artistData, setArtistData] = useState<{
    imgUrl: string;
  } | null>(null);
  const [concertData, setConcertData] = useState<{
    venueName: string;
    cityName: string;
  } | null>(null);

  // pastconcertId를 사용해 concertData 가져오기
  useEffect(() => {
    if (pastconcertId) {
      axios
        .get(`/api/past-concerts/${pastconcertId}`)
        .then((response) => {
          setConcertData({
            venueName: response.data.venueName,
            cityName: response.data.cityName,
          });
        })
        .catch((error) => {
          console.error('Error fetching past concert data:', error);
        });
    }
  }, [pastconcertId]);

  // artistId가 변경되면 artistData 가져오기
  useEffect(() => {
    if (artistId) {
      axios
        .get(`/api/artists/${artistId}`)
        .then((response) => {
          setArtistData({
            imgUrl: response.data.imgUrl,
          });
        })
        .catch((error) => {
          console.error('Error fetching artist data:', error);
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
          <SingerDetailImg Img={artistData.imgUrl} />
        ) : (
          <div>Loading artist data...</div>
        )}
        {concertData ? (
          <GlobalSingerHeader
            krName={concertData.venueName}
            engName={concertData.cityName}
          />
        ) : (
          <div>Loading concert data...</div>
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

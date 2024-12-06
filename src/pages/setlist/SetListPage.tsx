import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import GlobalSingerHeader from '@/components/global-singer-header';
import axios from 'axios';

const SetListPage = () => {
  const { artistId, pastConcertId } = useParams<{
    artistId: string;
    pastConcertId: string;
  }>();

  const [artistData, setArtistData] = useState<{
    imgUrl: string;
  } | null>(null);
  const [concertData, setConcertData] = useState<{
    venueName: string;
    cityName: string;
  } | null>(null);

  // Fetch artist data
  useEffect(() => {
    if (artistId) {
      axios
        .get(`/api/artists/${artistId}`) // 추가된 API 호출
        .then((response) => {
          setArtistData({
            imgUrl: response.data.imgUrl, // API의 응답 형식에 맞게 수정
          });
        })
        .catch((error) => {
          console.error('Error fetching artist data:', error);
        });
    }
  }, [artistId]);

  // Fetch concert data
  useEffect(() => {
    if (artistId && pastConcertId) {
      axios
        .get(`/api/artists/${artistId}/past-concerts`) // 기존 API 호출
        .then((response) => {
          const concerts = response.data;
          const concert = concerts.find(
            (c: any) => c.pastConcertId === Number(pastConcertId)
          );

          if (concert) {
            setConcertData({
              venueName: concert.venueName,
              cityName: concert.cityName,
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching past concerts data:', error);
        });
    }
  }, [artistId, pastConcertId]);

  if (!artistId || !pastConcertId) {
    return (
      <div className="text-center text-red-500 py-4">
        Artist ID or Concert ID is missing.
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
            likeId={artistId} // 수정된 부분
          />
        ) : (
          <div>Loading concert data...</div>
        )}
        <div className="w-full mt-4 ">
          <GlobalList title="셋리스트" />
        </div>
        <div className="flex px-4">
          <SetList artistId={Number(artistId)} pastConcertId={Number(pastConcertId)} />
        </div>
      </div>
    </div>
  );
};

export default SetListPage;

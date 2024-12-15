import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import GlobalSingerHeader from '@/components/global-singer-header';
import axios from 'axios';

interface ArtistData {
  imgUrl: string;
}

interface ConcertData {
  venueName: string;
  cityName: string;
  pastConcertId: number;
}

const SetListPage = () => {
  const { artistId, pastConcertId } = useParams<{
    artistId: string;
    pastConcertId: string;
  }>();

  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [concertData, setConcertData] = useState<ConcertData | null>(null);

  // Fetch artist data
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

  // Fetch concert data
  useEffect(() => {
    if (artistId && pastConcertId) {
      axios
        .get(`/api/artists/${artistId}/past-concerts`)
        .then((response) => {
          const concerts: ConcertData[] = response.data;
          const concert = concerts.find(
            (c) => c.pastConcertId === Number(pastConcertId)
          );

          if (concert) {
            setConcertData({
              venueName: concert.venueName,
              cityName: concert.cityName,
              pastConcertId: concert.pastConcertId,
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
            likeId={Number(artistId)} // 수정된 부분
          />
        ) : (
          <div>Loading concert data...</div>
        )}
        <div className="w-full mt-4">
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

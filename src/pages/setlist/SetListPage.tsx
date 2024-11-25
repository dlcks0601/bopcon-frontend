import React from 'react';
import { useParams } from 'react-router-dom';
import BackNavigationBar from '@/components/back-navigation-bar';
import SingerDetailImg from '@/components/singer-detail-img/SingerDetailImg';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import GlobalSingerHeader from '@/components/global-singer-header';

interface ArtistData {
  imgUrl: string;
  name: string;
  krName: string;
}

const SetListPage = () => {
  const {  pastconcertId } = useParams<{  pastconcertId: string }>(); // URL에서 pastconcertId 추출

  // artistData는 상위에서 전달받거나 상태 관리 라이브러리를 통해 가져온다고 가정
  const artistData: ArtistData | null = {
    imgUrl: 'https://example.com/artist.jpg',
    name: 'Artist Name',
    krName: '아티스트 이름',
  };

  if (!pastconcertId) {
    return (
      <div className="text-center text-red-500 py-4">
        Past concert ID is missing.
      </div>
    );
  }

  if (!artistData) {
    return (
      <div className="text-center text-gray-500 py-4">No artist data available.</div>
    );
  }

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm relative">
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <BackNavigationBar />
        </div>
        <SingerDetailImg Img={artistData.imgUrl} />
        <GlobalSingerHeader krName={artistData.name} engName={artistData.krName} />
        <div className="w-full mt-4 ">
          <GlobalList title="셋리스트" />
        </div>
        <div className="flex px-4">
          <SetList />
        </div>
      </div>
    </div>
  );
};

export default SetListPage;
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackNavigationBar from '@/components/back-navigation-bar';
import GlobalSingerHeader from '@/components/global-singer-header';
import GlobalList from '@/components/global-list';
import RankList from '@/components/rank-list/RankList';
import PastConcertList from '@/components/past-concert-list';
import Select from '@/components/select/Select';
import WriteList from '@/components/write-list/WriteList';
import MoreButton from '@/components/more-button/MoreButton';
import SingerLinks from '@/components/singer-links/SingerLinks';
import NowConcertList from '@/components/now-concert-list/NowConcertList';

const ArtistPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [artistData, setArtistData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRankExpanded, setIsRankExpanded] = useState(false);
  const [isPastConcertExpanded, setIsPastConcertExpanded] = useState(false);

  const displayedRankCount = isRankExpanded ? 30: 5;
  const rankSectionRef = useRef<HTMLDivElement>(null);
  const pastConcertSectionRef = useRef<HTMLDivElement>(null);
  const boardSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (artistId) {
      setLoading(true);
      axios
        .get(`/api/artists/${artistId}`)
        .then((response) => setArtistData(response.data))
        .catch((error) => console.error('Failed to fetch artist data:', error))
        .finally(() => setLoading(false));
    }
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!artistData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>아티스트 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm">
        <div className="sticky top-0 z-10 bg-black bg-opacity-50">
          <BackNavigationBar />
        </div>
        <SingerLinks
          artistUrls={{
            snsUrl: artistData.snsUrl,
            mediaUrl: artistData.mediaUrl,
          }}
          imgUrl={artistData.imgUrl}
        />
        <GlobalSingerHeader
          krName={artistData.name}
          engName={artistData.krName}
          likeId={artistData.artistId}
        />
        <section className="w-full mt-4">
          <GlobalList title="내한 예정" />
          <div className="flex px-3">
            <NowConcertList />
          </div>
        </section>
        <section className="w-full mt-12">
          <Select
            tabs={['곡 랭킹', '지난 공연', '게시판']}
            sectionRefs={[
              rankSectionRef,
              pastConcertSectionRef,
              boardSectionRef,
            ]}
          />
        </section>
        <section ref={rankSectionRef} className="w-full mt-6">
          <GlobalList title="곡 랭킹" subtitle="(최근 20개 콘서트 기준)" />
          <div className="flex px-3">
            <RankList
              highlightRanks={true}
              count={displayedRankCount}
              artistId={artistId}
            />
          </div>
          <MoreButton
            isExpanded={isRankExpanded}
            onToggle={() => setIsRankExpanded(!isRankExpanded)}
          />
        </section>
        <section ref={pastConcertSectionRef} className="w-full mt-14">
          <GlobalList title="지난 공연" />
          <div className="flex px-3">
            <PastConcertList
              artistId={artistId}
              isExpanded={isPastConcertExpanded}
            />
          </div>
          <MoreButton
            isExpanded={isPastConcertExpanded}
            onToggle={() => setIsPastConcertExpanded(!isPastConcertExpanded)}
          />
        </section>
        <section ref={boardSectionRef} className="w-full mt-14">
          {/* 게시판 섹션에 '더보기' 버튼 추가 */}
          <GlobalList
              title="게시판"
              rightText="더보기"
              artistId={artistId} // artistId 전달
             />
          <div className="w-full mt-4">
            <WriteList />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistPage;

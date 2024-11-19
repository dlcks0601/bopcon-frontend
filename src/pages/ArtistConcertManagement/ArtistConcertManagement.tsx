import React, { useRef, useState } from 'react';
import BackNavigationBar from '@/components/back-navigation-bar';
import GlobalSingerHeader from '@/components/global-singer-header';
import GlobalList from '@/components/global-list';
import SetList from '@/components/set-list';
import PastConcertList from '@/components/past-concert-list';
import Select from '@/components/select/Select';
import WriteList from '@/components/write-list/WriteList';
import MoreButton from '@/components/more-button/MoreButton';
import { upcomingConcertData } from '@/constants/upcomingConcertData';
import { pastConcertData } from '@/constants/pastConcertData';
import SingleLinks from '@/components/singer-links/SingerLinks';

const ArtistPage = () => {
  // URL 정보를 정의
    const artistUrls = {
    instagramUrl: "",
    spotifyUrl: "",
    };

  // State for managing "more/less" for each section
    const [isRankExpanded, setIsRankExpanded] = useState(false);
    const [isPastConcertExpanded, setIsPastConcertExpanded] = useState(false);

  // Display counts for each section
    const displayedRankCount = isRankExpanded ? 7 : 5;
    const displayedPastConcertCount = isPastConcertExpanded ? 3 : 2;

  // Section refs for navigation
    const rankSectionRef = useRef<HTMLDivElement>(null);
    const pastConcertSectionRef = useRef<HTMLDivElement>(null);
    const boardSectionRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative bg-white w-full min-h-screen flex justify-center">
        <div className="w-full max-w-screen-sm relative">
        {/* Navigation and header */}
            <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
                <BackNavigationBar />
            </div>
            {/* Pass artistUrls to SingerDetailImg */}
                < SingleLinks artistUrls={artistUrls} />
                <GlobalSingerHeader />
            {/* Upcoming concerts section */}
            <div className="w-full mt-4">
                <GlobalList title="내한 예정" />
            <div className="flex px-3">
                <PastConcertList data={upcomingConcertData} mode="upcoming" />
            </div>
            </div>

        {/* Tab selection section */}
        <div className="w-full mt-12">
            <Select
            tabs={['곡 랭킹', '지난 공연', '게시판']}
            sectionRefs={[rankSectionRef, pastConcertSectionRef, boardSectionRef]}
            />
        </div>

        {/* Rank section */}
        <div ref={rankSectionRef} className="w-full mt-6">
            <GlobalList title="곡 랭킹" subtitle="(최근 20개 콘서트 기준)" />
        <div className="flex px-3">
            <SetList highlightRanks={true} count={displayedRankCount} />
        </div>
        <div>
            <MoreButton
                isExpanded={isRankExpanded}
                onToggle={() => setIsRankExpanded(!isRankExpanded)}
            />
            </div>
            </div>

        {/* Past concerts section */}
        <div ref={pastConcertSectionRef} className="w-full mt-14">
            <GlobalList title="지난 공연" />
        <div className="flex px-3">
            <PastConcertList
                data={pastConcertData.slice(0, displayedPastConcertCount)}
                mode="past"
            />
        </div>
        <div>
            <MoreButton
                isExpanded={isPastConcertExpanded}
                onToggle={() => setIsPastConcertExpanded(!isPastConcertExpanded)}
            />
            </div>
        </div>

        {/* Board section */}
        <div ref={boardSectionRef} className="w-full mt-14 px-3">
            <GlobalList title="게시판" rightText="더보기" />
        <div className="w-full mt-4">
            <WriteList />
        </div>
    </div>
    </div>
    </div>
    );
};

export default ArtistPage;

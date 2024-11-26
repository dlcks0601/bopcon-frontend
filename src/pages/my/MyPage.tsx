import React, { useState, useRef } from 'react';
import MyNavigationBar from '@/components/my-navigation-bar/MyNavigationBar';
import GlobalList from '@/components/global-list';
import MoreButton from '@/components/more-button';
import Select from '@/components/select'; // Select 컴포넌트를 가져오는 부분
import MyConcert from '@/components/my-concert/Mycocnert';
import MyArtist from '@/components/my-artist';
import User from '@/components/user';
import MyWriteList from '@/components/my-write-list';

const MyPage = () => {
  const [isExpanded, setIsExpanded] = useState([false, false]);

  // 각 섹션의 Ref 생성
  const favoriateSectionRef = useRef(null);
  const articleSectionRef = useRef(null);

  const toggleExpand = (index: number) => {
    setIsExpanded((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <div className="relative bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm relative">
        <div className="relative top-0 left-0 right-0 z-10 bg-black bg-opacity-50">
          <MyNavigationBar />
        </div>
        <div className="w-full mt-15">
          <User />
        </div>
        <div className="w-full mt-4">
          <Select
            tabs={['즐겨찾기', '게시물']}
            sectionRefs={[favoriateSectionRef, articleSectionRef]}
          />
        </div>
        <section ref={favoriateSectionRef} className="w-full mt-4">
          <GlobalList title="아티스트" />
          <div className="flex px-4 flex-wrap">
            <MyArtist isExpanded={isExpanded[0]} />
          </div>
          <MoreButton
            isExpanded={isExpanded[0]}
            onToggle={() => toggleExpand(0)}
          />
        </section>
        <section ref={favoriateSectionRef} className="w-full mt-4">
          <GlobalList title="콘서트" />
          <div className="flex px-4 flex-wrap">
            <MyConcert isExpanded={isExpanded[1]} />
          </div>
          <MoreButton
            isExpanded={isExpanded[1]}
            onToggle={() => toggleExpand(1)}
          />
        </section>
        <section ref={ articleSectionRef} className="w-full mt-4">
          <GlobalList title="게시물" />
          <div className="flex px-4 flex-wrap">
            <MyWriteList isExpanded={isExpanded[2]} />
          </div>
          <MoreButton
            isExpanded={isExpanded[2]}
            onToggle={() => toggleExpand(2)}
          />
        </section>
      </div>
    </div>
  );
};

export default MyPage;

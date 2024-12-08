import React, { useState } from 'react';
import MyNavigationBar from '@/components/my-navigation-bar/MyNavigationBar';
import GlobalList from '@/components/global-list';
import MoreButton from '@/components/more-button';
import MyConcert from '@/components/my-concert/Mycocnert';
import MyArtist from '@/components/my-artist';
import User from '@/components/user';
import MyWriteList from '@/components/my-write-list';
import MyCommentList from '@/components/my-comment-list';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0); // 현재 활성화된 탭의 index
  const [isExpanded, setIsExpanded] = useState([false, false, false,false]);

  const toggleExpand = (index: number) => {
    setIsExpanded((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="bg-white w-full flex justify-center">
            <div className="w-full max-w-screen-sm">
              <GlobalList title="아티스트" />
              <div className="flex px-4 flex-wrap">
                <MyArtist isExpanded={isExpanded[0]} />
              </div>
              <MoreButton
                isExpanded={isExpanded[0]}
                onToggle={() => toggleExpand(0)}
              />
              <GlobalList title="콘서트" />
              <div className="flex px-4 flex-wrap">
                <MyConcert isExpanded={isExpanded[1]} />
              </div>
              <MoreButton
                isExpanded={isExpanded[1]}
                onToggle={() => toggleExpand(1)}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="bg-white w-full flex justify-center">
            <div className="w-full max-w-screen-sm">
              <GlobalList title="게시물" />
              <div className="w-full max-w-screen-sm">
                <MyWriteList isExpanded={isExpanded[2]} />
              </div>
              <MoreButton
                isExpanded={isExpanded[2]}
                onToggle={() => toggleExpand(2)}
              />
              <div className="my-8"></div>
              <GlobalList title="댓글" />
              <div className="px-7 max-w-screen-sm">
                <MyCommentList isExpanded={isExpanded[3]} />
              </div>
              <MoreButton
                isExpanded={isExpanded[3]}
                onToggle={() => toggleExpand(3)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full min-h-screen flex justify-center">
      <div className="w-full max-w-screen-sm">
        <MyNavigationBar />
        <div className="mt-6">
          <User />
        </div>
        {/* 탭 메뉴 */}
        <div className="w-full mt-4">
          <div className="flex flex-col items-center">
            {/* 탭 버튼 */}
            <div className="flex gap-1">
              {['즐겨찾기', '게시물'].map((tab, index) => (
                <button
                  key={tab}
                  className={`px-32 py-2 text-sm rounded-md transition-all ${
                    activeTab === index
                      ? 'font-bold text-black border border-gray-400 bg-white'
                      : 'text-gray-500 bg-gray-100'
                  }`}
                  onClick={() => setActiveTab(index)}
                  aria-selected={activeTab === index}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* 탭 콘텐츠 */}
        <div className="w-full mt-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default MyPage;

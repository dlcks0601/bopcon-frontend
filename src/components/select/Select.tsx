import React, { useState, RefObject } from 'react';

interface SelectProps {
  tabs: string[];
  sectionRefs: RefObject<HTMLDivElement>[]; // 각 섹션의 ref를 배열로 받음
}

const Select: React.FC<SelectProps> = ({ tabs, sectionRefs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (index: number) => {
    setActiveTab(tabs[index]);
    sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' }); // 클릭된 탭의 섹션으로 스크롤
  };

  return (
    <div className="w-full max-w-[584px] mx-auto">
      {/* 탭 메뉴 */}
      <div className="flex border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`flex-1 text-center py-2 text-sm transition-all ${
              activeTab === tab
                ? 'font-bold text-black border-t-2 border-l-2 border-r-2 border-gray-300 bg-white'
                : 'text-gray-500 bg-gray-100'
            }`}
            onClick={() => handleTabClick(index)}
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;

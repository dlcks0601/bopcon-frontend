import ListCard from '@/components/list-card';
import sliderCardData from '@/constants/sliderCard';

interface GlobalListContentsProps {
  title: string;
}

const GlobalListContents: React.FC<GlobalListContentsProps> = ({ title }) => {
  return (
    <div className='flex flex-col w-full mx-auto h-auto py-[8px]'>
      {/* 상단 타이틀과 더보기 */}
      <div className='w-full flex justify-between items-center px-4 py-[18px]'>
        <div
          className='font-bold text-black text-[26px]'
          style={{ fontFamily: 'Agenda One, sans-serif' }}
        >
          {title}
        </div>
        <div className='font-medium text-[#8c8c8c] text-[15px]'>더보기</div>
      </div>

      {/* 고정 크기의 플레이리스트 카드 목록, 가로 스크롤 가능 */}
      <div className='flex gap-[15px] px-[20px] overflow-x-auto scrollbar-hide mt-[-4px]'>
        {sliderCardData.map((list, index) => (
          <div key={index} className='flex-shrink-0'>
            <ListCard
              image={list.image}
              title={list.title}
              name={list.name}
              date={list.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalListContents;

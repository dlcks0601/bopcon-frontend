import sampleImg from '@/assets/images/sampleimg1.jpg';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListCardProps {
  concertId: number; // 추가된 concertId
  image: string;
  title: string;
  name: ReactNode;
  startDate: number[]; // 배열 형태로 수정
  endDate: number[];
}

const ListCard: React.FC<ListCardProps> = ({
  concertId, // concertId 추가
  image = sampleImg,
  title,
  name,
  startDate,
    endDate
}) => {
  const navigate = useNavigate();

  // 날짜 배열을 포맷팅하는 함수
  const formatDate = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

  const handleCardClick = () => {
    navigate(`/concert/${concertId}`); // concertId를 포함한 URL로 이동
  };

  return (
    <div
      onClick={handleCardClick}
      className='flex flex-col w-full items-start gap-4 px-0 py-[25px] relative bg-white font-sans cursor-pointer'
    >
      {/* 이미지 컨테이너 */}
      <div className='relative w-full h-0 pb-[133%]'>
        {/* 3:4 비율을 유지하는 방법 */}
        <img
          className='absolute inset-0 w-full h-full object-cover'
          alt={title}
          src={image}
        />
      </div>

      <div className='flex flex-col items-start gap-[5px] p-2 w-full mt-[-15px]'>
        <div className='font-bold text-black text-[20px] truncate w-[255px] overflow-hidden text-ellipsis'>
          {title}
        </div>
        <div className='font-medium text-[#a1a1a1] text-[18px]'>{name}</div>
        <div className='font-light text-[#a7a7a7] text-[14px]'>
          {startDate.toString() === endDate.toString()
              ? formatDate(startDate) // startDate와 endDate가 동일하면 한 번만 표시
              : `${formatDate(startDate)}~${formatDate(endDate)}`}
        </div>
      </div>
    </div>
  );
};

export default ListCard;

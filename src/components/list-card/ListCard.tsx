import sampleImg from '@/assets/images/sampleimg1.jpg';
import { useNavigate } from 'react-router-dom';

interface ListCardProps {
  concertId: number;
  image: string;
  title: string;
  name: string;
  startDate: number[]; // 배열 형태로 수정
  endDate: number[];
}

const ListCard: React.FC<ListCardProps> = ({
  concertId,
  image = sampleImg,
  title,
  name,
  startDate,
    endDate,
}) => {
  const navigate = useNavigate();

  // 날짜 배열을 포맷팅하는 함수
  const formatDate = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

  const handleCardClick = () => {
    navigate(`/concert/${concertId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className='flex flex-col w-full items-start gap-4 px-0 py-[25px] relative bg-white font-sans cursor-clickable'
    >
      {/* 이미지 컨테이너 */}
      <div className='relative w-full w-[250px] h-[333px]'>
        <img className='object-cover w-[250px] h-[333px]' alt={title} src={image} />
      </div>
      <div className='flex flex-col items-start gap-[5px] w-full'>
        <div className='font-bold text-black text-[20px] truncate w-[255px] overflow-hidden text-ellipsis'>
          {title}
        </div>
        <div className='font-medium text-[#a1a1a1] text-[18px]'>{name}</div>
        {/* 날짜 포맷팅된 값으로 표시 */}
        <div className='font-light text-[#a7a7a7] text-[14px]'>
          {`${formatDate(startDate)}~${formatDate(endDate)}`}
        </div>
      </div>
    </div>
  );
};

export default ListCard;

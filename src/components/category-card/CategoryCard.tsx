import sampleImg from '@/assets/images/sampleimg1.jpg';
import { useNavigate } from 'react-router-dom';

interface ListCardProps {
  image: string;
  title: string;
  name: string;
  date: string;
}

const ListCard: React.FC<ListCardProps> = ({
  image = sampleImg,
  title,
  name,
  date,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/concert');
  };

  return (
    <div
      onClick={handleCardClick}
      className='flex flex-col w-full items-start gap-4 px-0 py-[25px] relative bg-white font-sans cursor-pointer'
    >
      {/* 이미지 컨테이너 */}
      <div className='relative w-full h-0 pb-[133%]'>
        {' '}
        {/* 3:4 비율을 유지하는 방법 */}
        <img
          className='absolute inset-0 w-full h-full object-cover'
          alt={title}
          src={image}
        />
      </div>

      <div className='flex flex-col items-start gap-[5px] p-2 w-full mt-[-15px]'>
        <div className='font-bold text-black text-[23px] truncate'>{title}</div>
        <div className='font-medium text-[#a1a1a1] text-[18px]'>{name}</div>
        <div className='font-light text-[#a7a7a7] text-[14px]'>{date}</div>
      </div>
    </div>
  );
};

export default ListCard;

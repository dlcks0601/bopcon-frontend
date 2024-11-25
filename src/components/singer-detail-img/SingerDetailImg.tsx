import React from 'react';


interface SingerDetailImgProps{
  Img: string;
}
const SingerDetailImg: React.FC<SingerDetailImgProps> = ({Img}) => {
  return (
    <div className='flex justify-center items-center py-[30px] px-[50px] bg-white'>
      <img
        src={Img || ''}
        alt='Concert Detail'
        className='w-full h-auto object-cover'
      />
    </div>
  );
};

export default SingerDetailImg;

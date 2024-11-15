import React from 'react';

interface ConcertDetailImgProps {
    posterUrl: string;
}

const ConcertDetailImg: React.FC<ConcertDetailImgProps> = ({ posterUrl }) => {
    return (
        <div className='flex justify-center items-center py-[30px] px-[50px] bg-white'>
            <img
                src={posterUrl}
                alt='Concert Poster'
                className='w-full h-auto object-cover'
            />
        </div>
    );
};

export default ConcertDetailImg;

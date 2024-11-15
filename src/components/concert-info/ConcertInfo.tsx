import React from 'react';

interface ConcertInfoProps {
    date: string;
    venueName: string;
    cityName: string;
    countryName: string;
    ticketUrl: string;
}

const ConcertInfo: React.FC<ConcertInfoProps> = ({ date, venueName, cityName, countryName, ticketUrl }) => {
    return (
        <div className='flex flex-col gap-4 px-8 py-4 bg-white'>
            <div className='flex justify-between'>
                <span className='text-black font-light'>공연 일정</span>
                <span className='text-gray-600 text-sm'>{date}</span>
            </div>
            <div className='flex justify-between'>
                <span className='text-black font-light'>공연 장소</span>
                <span className='text-gray-600 text-sm'>{venueName}, {cityName}, {countryName}</span>
            </div>
            <div className='flex justify-between'>
                <span className='text-black font-light'>티켓 예매</span>
                <a href={ticketUrl} target='_blank' rel='noopener noreferrer' className='text-blue-600 text-sm'>예매하기</a>
            </div>
        </div>
    );
};

export default ConcertInfo;

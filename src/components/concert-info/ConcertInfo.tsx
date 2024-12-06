import React from 'react';

interface ConcertInfoProps {
    date: [number, number, number]; // year, month, day 배열 형식
    venueName: string;
    cityName: string;
    countryName: string;
    ticketUrl: string;
}

const ConcertInfo: React.FC<ConcertInfoProps> = ({ date, venueName, cityName, countryName, ticketUrl }) => {
    // 배열을 YYYY-MM-DD 포맷으로 변환
    const formattedDate = `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;

    return (
        <div className='flex flex-col gap-4 px-8 py-4 bg-white'>
            <div className='flex justify-between'>
                <span className='text-black font-light'>공연 일정</span>
                <span className='text-gray-600 text-sm'>{formattedDate}</span>
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

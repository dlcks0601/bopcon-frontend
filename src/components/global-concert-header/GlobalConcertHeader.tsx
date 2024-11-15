import React from 'react';
import DetailName from '../detail-name.tsx';
import Like from '../like/Like.tsx';

interface GlobalConcertHeaderProps {
    title: string;
    subTitle: string;
}

const GlobalConcertHeader: React.FC<GlobalConcertHeaderProps> = ({ title, subTitle }) => {
    return (
        <div className='flex items-center justify-between px-8 py-4'>
            <DetailName title={title} subtitle={subTitle} />
            <Like />
        </div>
    );
};

export default GlobalConcertHeader;

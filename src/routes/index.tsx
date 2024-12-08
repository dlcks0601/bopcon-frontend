// routes/router.ts

import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main';
import LoginPage from '@/pages/login';
import JoinPage from '@/pages/join';

import SetListPage from '@/pages/setlist';
import PastConcertPage from '@/pages/past-concert';
import ConcertPage from '@/pages/concert/ConcertPage';
import AllPage from '@/pages/category/all';
import NewPage from '@/pages/category/new';
import JpopPage from '@/pages/category/jpop';
import RnbPage from '@/pages/category/rnb';
import RockPage from '@/pages/category/rock';
import PopPage from '@/pages/category/pop';
import HiphopPage from '@/pages/category/hiphop';
import ArtistPage from '@/pages/artist/ArtistPage';
import MyPage from '@/pages/my';
import BoardPage from '@/pages/board';
import SearchPage from '@/pages/search';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
  {
    path: '/concert', // 콘서트 페이지에 id 파라미터 추가
    element: <ConcertPage />,
  },
  {
    path: '/artist/:artistId/setlist/:pastConcertId', // SetList 페이지에 id 파라미터 추가
    element: <SetListPage />,
  },
  {
    path: '/past-concerts/:artistId',
    element: <PastConcertPage />,
  },
  {
    path: '/all',
    element: <AllPage />,
  },
  {
    path: '/new',
    element: <NewPage />,
  },
  {
    path: '/rnb',
    element: <RnbPage />,
  },
  {
    path: '/rock',
    element: <RockPage />,
  },
  {
    path: '/jpop',
    element: <JpopPage />,
  },
  {
    path: '/pop',
    element: <PopPage />,
  },
  {
    path: '/hiphop',
    element: <HiphopPage />,
  },
  {
    path: '/concert/:concertId',
    element: <ConcertPage />,
  },
  {
    path: '/artist/:artistId',
    element : <ArtistPage/>,
  },
  {
    path: '/mypage',
    element : <MyPage/>,
  },
  {
    path: '/board/:artistId',
    element : <BoardPage/>,
  },
  {
    path: "/search", // 검색 페이지 추가
    element: <SearchPage/>,
  },
]);

export default router;

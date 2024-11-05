// routes/router.ts

import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main';
import LoginPage from '@/pages/login';
import JoinPage from '@/pages/join';
import SetListPage from '@/pages/setlist';
import PastConcertPage from '@/pages/past-concert';
import ConcertPage from '@/pages/concert/ConcertPage';

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
    path: '/setlist', // SetList 페이지에 id 파라미터 추가
    element: <SetListPage />,
  },
  {
    path: '/past-concerts',
    element: <PastConcertPage />,
  },
]);

export default router;

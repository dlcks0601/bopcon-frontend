import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main'; // 경로가 맞는지 확인
import LoginPage from '@/pages/login';
import JoinPage from '@/pages/join';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'Join',
    element: <JoinPage />,
  },
]);

export default router;

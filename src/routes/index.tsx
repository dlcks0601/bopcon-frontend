import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main'; // 경로가 맞는지 확인

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

export default router;

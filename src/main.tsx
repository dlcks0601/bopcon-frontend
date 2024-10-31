import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/index'; // 경로 확인
import '@/styles/global.css'; // Tailwind CSS 연결

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);

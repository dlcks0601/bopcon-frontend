import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/index'; // 경로 확인
import '@/styles/global.css'; // Tailwind CSS 연결
import { Provider } from 'react-redux';
import { store } from './store';

// Adobe Fonts CSS 링크 추가
const adobeFontKitId = import.meta.env.VITE_ADOBE_FONT_KIT_ID;
if (adobeFontKitId) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://use.typekit.net/${adobeFontKitId}.css`;
  document.head.appendChild(link);
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {' '}
    {/* Redux Provider로 App 감싸기 */}
    <RouterProvider router={router} />
  </Provider>
);

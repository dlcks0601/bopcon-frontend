/// <reference types="vitest" />
/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // src 디렉토리를 @로 참조
    },
  },
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://bopcon-env-1.eba-t4zkjfm2.ap-northeast-2.elasticbeanstalk.com/', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://bopcon-env-1.eba-t4zkjfm2.ap-northeast-2.elasticbeanstalk.com/', // 추가로 다른 API 경로를 백엔드로 전달
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true, // 전역 테스트 환경 사용
    environment: 'jsdom', // React 컴포넌트를 테스트하기 위한 환경
    setupFiles: './src/setupTests.ts', // 초기 설정 파일 지정 (필요 시 생성)
    css: true, // CSS 로딩 활성화
    testTimeout: 30000, // 테스트 타임아웃 설정
  },
});

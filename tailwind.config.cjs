module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // Pretendard를 sans 폰트로 설정
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // 다른 플러그인
  ],
};

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 외부 디바이스 접속 설정
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // 서비스 워커 자동 업데이트
      // localhost 에서 Service Worker + Manifest 등록
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto', // 서비스 워커 자동 등록

      manifest: {
        name: 'PLOG',
        short_name: 'PLOG',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        // 192, 512 해상도에서 홈 화면 아이콘 지원
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});

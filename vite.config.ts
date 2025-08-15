import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0', // 외부 디바이스 접속 설정
        proxy: {
            '/api': {
                target: 'https://dev-api-studytrip.duckdns.org', // 실제 백엔드 주소
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@lib': path.resolve(__dirname, 'src/lib'),
        },
    },
    plugins: [
        react(),
        svgr(), // SVG 파일을 React 컴포넌트로 변환
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
                        src: '/assets/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/assets/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
});

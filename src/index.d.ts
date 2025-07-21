declare module '*.css';
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/scrollbar';
declare module '*.png';

// Vite 환경변수 타입 추가
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KAKAO_REST_API_KEY: string;
    readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

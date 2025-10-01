import axios from 'axios';
import { getDefaultStore } from 'jotai';
import { accessTokenAtom } from '@store/auth';

const store = getDefaultStore();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // 쿠키 자동 전송
});

const authExcludedPaths = [
    '/auth/login/kakao',
    '/auth/signup/kakao',
    '/auth/token/reissue',
];

api.interceptors.request.use(
    (config) => {
        const token = store.get(accessTokenAtom);

        if (!authExcludedPaths.includes(config.url || '')) {
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 401 처리 - 중복 처리 방지
let isRefreshing = false;

type FailedRequest = {
    resolve: (token: string) => void;
    reject: (error: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token as string);
    });
    failedQueue = [];
};

// 응답 인터셉터 – accessToken 만료 시 자동 갱신
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 제외 경로를 한 번 더 체크
        if (authExcludedPaths.includes(originalRequest.url || '')) {
            return Promise.reject(error);
        }

        // accessToken 만료 (401) + 한 번만 재시도
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            //accessToken 재발급시도
            try {
                const res = await api.post('/auth/token/reissue');

                const newAccessToken = res.data.data.accessToken;
                store.set(accessTokenAtom, newAccessToken);

                processQueue(null, newAccessToken);

                // 새 accessToken으로 원래 요청 다시 시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('토큰 갱신 실패', refreshError);
                processQueue(refreshError, null);

                store.set(accessTokenAtom, null);
                window.location.href = '/';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        if (error.response) {
            const status = error.response.status;

            if (status === 400) {
                alert('잘못된 요청입니다. 뒤로가기를 눌러주세요.');
            } else if (status === 403) {
                alert('접근 권한이 없습니다. 뒤로가기를 눌러주세요.');
            } else if (status === 404) {
                alert('요청한 자원을 찾을 수 없습니다. 뒤로가기를 눌러주세요.');
            } else if (status >= 500) {
                alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        } else {
            alert('네트워크 오류가 발생했습니다. 뒤로가기를 눌러주세요.');
        }

        return Promise.reject(error);
    }
);

export default api;

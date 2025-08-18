import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const authExcludedPaths = [
    '/auth/login/kakao',
    '/auth/signup/kakao',
    '/auth/logout',
    '/auth/token/reissue',
];

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');

        if (!authExcludedPaths.includes(config.url || '')) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 – accessToken 만료 시 자동 갱신
let isRefreshing = false;

type FailedRequest = {
    resolve: (token: string) => void;
    reject: (error: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token as string);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // accessToken 만료 (401) + 한 번만 재시도
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const res = await axios.post('/api/auth/token/reissue', {
                    refreshToken,
                });

                const newAccessToken = res.data.accessToken;
                //refreshToken도 갱신되는 경우 처리
                if (res.data.refreshToken) {
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                }
                localStorage.setItem('accessToken', newAccessToken);

                processQueue(null, newAccessToken);

                // 새 accessToken으로 원래 요청 다시 시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('토큰 갱신 실패', refreshError);
                processQueue(refreshError, null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/'; // 또는 navigate('/') 등 로그아웃 처리
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;

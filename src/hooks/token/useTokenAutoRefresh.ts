import { useCallback, useEffect, useRef } from 'react';

import { getTokenExpirationTime, refreshAccessToken } from '@utils/token';

/**
 * 토큰 자동 갱신 Hook
 * 토큰 만료 5분 전에 자동으로 갱신
 */
// 개선 버전: 토큰을 인자로 받는 형태
const useTokenAutoRefresh = (token: string | null) => {
    const timeoutRef = useRef<number | null>(null);

    const scheduleTokenRefresh = useCallback((t: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const timeUntilExpiration = getTokenExpirationTime(t);
        if (timeUntilExpiration === 0) return;

        const FIVE_MINUTES = 5 * 60 * 1000;
        const refreshTime = timeUntilExpiration - FIVE_MINUTES;

        if (refreshTime <= 0) {
            refreshAccessToken().then((newToken) => {
                if (newToken) scheduleTokenRefresh(newToken);
            });
            return;
        }

        timeoutRef.current = window.setTimeout(async () => {
            const newToken = await refreshAccessToken();
            if (newToken) scheduleTokenRefresh(newToken);
            else window.location.href = '/';
        }, refreshTime);
    }, []);

    useEffect(() => {
        if (token) {
            scheduleTokenRefresh(token);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [token, scheduleTokenRefresh]);
};

export default useTokenAutoRefresh;

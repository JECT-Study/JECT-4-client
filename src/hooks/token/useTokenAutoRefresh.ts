import { getDefaultStore } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';

import { sessionStorageAtom } from '@store/auth';
import { getTokenExpirationTime, refreshAccessToken } from '@utils/token';

/**
 * 토큰 자동 갱신 Hook
 * 토큰 만료 5분 전에 자동으로 갱신
 */
const useTokenAutoRefresh = () => {
    const store = getDefaultStore();
    const timeoutRef = useRef<number | null>(null);

    const scheduleTokenRefresh = useCallback((token: string) => {
        // 기존 타이머 정리
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const timeUntilExpiration = getTokenExpirationTime(token);

        if (timeUntilExpiration === 0) return;

        // 만료 5분 전에 갱신 (5분 = 300,000ms)
        const FIVE_MINUTES = 5 * 60 * 1000;
        const refreshTime = timeUntilExpiration - FIVE_MINUTES;

        // 이미 만료 임박 상태면 즉시 갱신
        if (refreshTime <= 0) {
            refreshAccessToken().then((newToken) => {
                if (newToken) scheduleTokenRefresh(newToken);
            });

            return;
        }

        timeoutRef.current = setTimeout(async () => {
            const newToken = await refreshAccessToken();

            // 다음 갱신 스케줄링
            if (newToken) scheduleTokenRefresh(newToken);
            else window.location.href = '/'; // 로그인 실패 시
        }, refreshTime);
    }, []);

    useEffect(() => {
        const token = store.get(sessionStorageAtom);

        if (token) scheduleTokenRefresh(token);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [scheduleTokenRefresh]);

    return { scheduleTokenRefresh };
};

export default useTokenAutoRefresh;

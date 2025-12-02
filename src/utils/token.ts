import { getDefaultStore } from 'jotai';

import api from '@lib/axios';
import { sessionStorageAtom } from '@store/auth';

/**
 * JWT 토큰 파싱 및 만료 시간 확인
 * @param token - JWT 토큰 문자열
 * @returns 만료까지 남은 시간 (밀리초), 유효하지 않으면 0
 */
export const getTokenExpirationTime = (token: string): number => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        return timeUntilExpiration > 0 ? timeUntilExpiration : 0;
    } catch (error) {
        return 0;
    }
};

const store = getDefaultStore();

/**
 * 토큰이 곧 만료되는지 확인 (5분 이내)
 * @param token - JWT 토큰 문자열
 * @returns 만료 임박 여부
 */
export const isTokenExpiringSoon = (token: string): boolean => {
    const timeUntilExpiration = getTokenExpirationTime(token);
    const FIVE_MINUTES = 5 * 60 * 1000;

    return timeUntilExpiration > 0 && timeUntilExpiration < FIVE_MINUTES;
};

/**
 * 토큰 갱신 함수
 * @returns 갱신된 토큰 또는 null
 */
export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const { data } = await api.post('/auth/token/reissue');
        const newToken = data.accessToken;

        store.set(sessionStorageAtom, newToken);

        return newToken;
    } catch (error) {
        store.set(sessionStorageAtom, null);
        return null;
    }
};

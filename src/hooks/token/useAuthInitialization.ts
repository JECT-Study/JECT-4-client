import { getDefaultStore } from 'jotai';
import { useEffect, useState } from 'react';

import { accessTokenAtom } from '@store/auth';
import { isTokenExpiringSoon, refreshAccessToken } from '@utils/token';

/**
 * 앱 초기화 시 토큰 검증 및 갱신
 */
const useAuthInitialization = () => {
    const store = getDefaultStore();

    const [authReady, setAuthReady] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = store.get(accessTokenAtom);

                // 토큰이 없으면 바로 초기화 진행 (비로그인 상태)
                if (!token) {
                    setAuthReady(true);
                    return;
                }

                // 토큰이 만료되었거나 곧 만료될 예정이면 미리 갱신
                if (isTokenExpiringSoon(token)) {
                    const newToken = await refreshAccessToken();

                    if (!newToken) {
                        setAuthError('세션이 만료되었습니다.');
                        setTimeout(() => (window.location.href = '/'), 3000);
                        return;
                    }
                }

                setAuthReady(true);
            } catch (error) {
                setAuthError('인증 초기화 중 오류가 발생했습니다.');
                setTimeout(() => setAuthReady(true), 3000);
            }
        };

        initializeAuth();
    }, []);

    return { authReady, authError };
};

export default useAuthInitialization;

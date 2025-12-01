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

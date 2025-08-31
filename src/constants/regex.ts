export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,10}$/;

export const validateNickname = (value: string): boolean => {
    if (value.length === 0) return true; // 빈 값은 에러 아님
    return NICKNAME_REGEX.test(value);
};

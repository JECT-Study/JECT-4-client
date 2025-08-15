import { atom } from 'jotai';

export interface SignupUserInfo {
    code: string;
    category: string;
    nickname: string;
}

export const signupUserInfoAtom = atom<SignupUserInfo>({
    code: '',
    category: '',
    nickname: '',
});

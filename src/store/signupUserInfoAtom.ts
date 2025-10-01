import { atom } from 'jotai';

export interface SignupUserInfo {
    category: string;
    nickname: string;
}

export const signupUserInfoAtom = atom<SignupUserInfo>({
    category: '',
    nickname: '',
});

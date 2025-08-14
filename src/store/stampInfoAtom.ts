import { atom } from 'jotai';

export interface Stamp {
    name: string;
    order: number;
}

export type Category = 'COURSE' | 'EXPLORE';

export interface TravelInfo {
    name: string;
    memo: string;
    category: Category;
    endDate: string; // yyyy-MM-dd 형식
    stamps: Stamp[];
}

export const travelInfoAtom = atom<TravelInfo>({
    name: '',
    memo: '',
    category: 'COURSE',
    endDate: '', // 기본값
    stamps: [
        {
            name: '',
            order: 0,
        },
    ],
});

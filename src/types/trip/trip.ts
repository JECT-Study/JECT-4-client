import type { Stamp } from '../stamp';

export interface TripDetail {
    tripId: number;
    name: string;
    memo: string;
    category: string;
    startDate: string;
    endDate: string;
    dDay: number;
    totalStamps: number;
    completedStamps: number;
    progress: number;
    completed: boolean;
    stamps: Stamp[];
}

export type TripRequestBody = Pick<
    TripDetail,
    'name' | 'memo' | 'endDate' | 'category'
>;

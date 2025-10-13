export interface ResponseDTO {
    success: boolean;
    status: number;
    data: null;
}

export interface MutationStampProps {
    tripId: number;
    stampId: number;
}

export interface StampDetail {
    stampId: number;
    stampName: string;
    stampOrder: number;
    completed: boolean;
    missions: number[];
}

export type Stamp = Omit<StampDetail, 'missions'>;

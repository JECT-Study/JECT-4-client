import api from '../../lib/axios';

export interface Stamp {
    stampId: number;
    stampName: string;
    stampOrder: number;
    completed: boolean;
}

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

export const fetchTripDetail = async (tripId: number): Promise<TripDetail> => {
    try {
        const { data } = await api.get<{ data: TripDetail }>(
            `/trips/${tripId}`
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response?.status === 404) {
            throw new Error('해당하는 여행을 찾을 수 없습니다.');
        }

        throw new Error(
            '여행 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
    }
};

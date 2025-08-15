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
    const { data } = await api.get(`/trips/${tripId}`);

    if (data.status !== 200) {
        throw new Error('해당하는 여행을 찾을 수 없습니다.');
    }

    return data.data;
};

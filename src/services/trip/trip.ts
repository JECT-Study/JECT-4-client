import api from '../../lib/axios';
import type { TripDetail, TripRequestBody } from '../../types/trip/trip';

/**
 *
 * @param tripId 여행 id
 * @returns 여행 상세 데이터
 */
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

/**
 *
 * @param tripId 여행 id
 * @returns 여행 수정 요청 응답
 */
export const patchTrip = async (
    tripId: number,
    tripContent: TripRequestBody
) => {
    try {
        const { data } = await api.patch(`trips/${tripId}`, tripContent);

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response?.status === 404) {
            throw new Error('여행 정보를 수정할 수 없습니다.');
        }

        throw new Error(
            '여행 정보를 수정하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.'
        );
    }
};

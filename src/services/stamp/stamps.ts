import api from '../../lib/axios';
import type { StampDetail } from '../../types/stamp';

/**
 *
 * @param tripId 여행 id
 * @param stampId 스탬프 id
 * @returns 요청한 스탬프 상세 데이터
 */
export const fetchStampDetail = async (
    tripId: number,
    stampId: number
): Promise<StampDetail> => {
    try {
        const { data } = await api.get(`/trips/${tripId}/stamps/${stampId}`);

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response.status === 404) {
            throw new Error('스탬프를 조회할 수 없습니다.');
        }

        throw new Error(
            '스탬프를 조회하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

/**
 *
 * @param tripId 여행 id
 * @param stampId 스탬프 id
 * @returns 스탬프 완료 응답
 */
export const completeStamp = async (tripId: number, stampId: number) => {
    try {
        const { data } = await api.patch(
            `/trips/${tripId}/stamps/${stampId}/complete`
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any).response?.status === 404) {
            throw new Error('스탬프를 완료할 수 없습니다.');
        }

        throw new Error(
            '스탬프를 완료하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const patchStamp = async (
    tripId: number,
    stampId: number,
    body: { name: string }
) => {
    try {
        const { data } = await api.patch(
            `/trips/${tripId}/stamps/${stampId}`,
            body
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any).response?.status === 404) {
            throw new Error('스탬프를 수정할 수 없습니다.');
        }

        throw new Error(
            '스탬프를 수정하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const createStamp = async (tripId: number, body: { name: string }) => {
    try {
        const { data } = await api.post(`trips/${tripId}/stamps`, body);

        return data.data;
    } catch (error: unknown) {
        if ((error as any).response?.status === 404) {
            throw new Error('스탬프를 추가할 수 없습니다.');
        }

        throw new Error(
            '스탬프를 추가하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const deleteStamp = async (tripId: number, stampId: number) => {
    try {
        const { data } = await api.delete(`/trips/${tripId}/stamps/${stampId}`);

        return data.data;
    } catch (error: unknown) {
        if ((error as any).repsponse?.status === 404) {
            throw new Error('스탬프를 삭제할 수 없습니다.');
        }

        throw new Error(
            '스탬프를 삭제할 수 없습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

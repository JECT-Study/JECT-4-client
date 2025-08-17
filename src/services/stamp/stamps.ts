import api from '../../lib/axios';
import type { StampDetail } from '../../types/stamp';

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

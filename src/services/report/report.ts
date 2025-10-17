import api from '@lib/axios';

export const getTripReport = async () => {
    try {
        const { data } = await api.get('/trip-reports');

        return data.data;
    } catch (error: unknown) {
        if ((error as any).response?.status === 404) {
            throw new Error('여행 리포트를 불러올 수 없습니다.');
        }

        throw new Error(
            '여행 리포트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
    }
};

export const getDetailTripReport = async (
    tripReportId: number,
    page: number,
    size: number
) => {
    try {
        const { data } = await api.get(
            `/trip-reports/${tripReportId}?page=${page}&size=${size}`
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any).response?.status === 404) {
            throw new Error('상세 여행 리포트를 불러올 수 없습니다.');
        }

        throw new Error(
            '상세 여행 리포트를 불러오지 못했습니다.  잠시 후 다시 시도해 주세요.'
        );
    }
};

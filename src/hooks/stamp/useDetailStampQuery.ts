import { useQuery } from '@tanstack/react-query';
import type { StampDetail } from '../../types/stamp';
import { fetchStampDetail } from '../../services/stamp/stamps';

const useDetailStampQuery = (tripId: number, stampId: number) => {
    return useQuery<StampDetail, Error>({
        queryKey: ['stamp', tripId, stampId],
        queryFn: () => {
            if (!tripId || !stampId) {
                throw new Error('스탬프를 조회할 수 없습니다.');
            }

            return fetchStampDetail(tripId, stampId);
        },
        enabled: !!tripId && !!stampId,
        staleTime: 60_000,
    });
};

export default useDetailStampQuery;

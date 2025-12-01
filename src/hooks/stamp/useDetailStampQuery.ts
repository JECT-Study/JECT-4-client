import { getDefaultStore } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { accessTokenAtom } from '@store/auth';
import type { StampDetail } from '../../types/stamp';
import { fetchStampDetail } from '../../services/stamp/stamps';

const useDetailStampQuery = (tripId: number, stampId: number) => {
    const store = getDefaultStore();
    const token = store.get(accessTokenAtom);

    return useQuery<StampDetail, Error>({
        queryKey: ['stamp', tripId, stampId],
        queryFn: () => {
            if (!tripId || !stampId) {
                throw new Error('스탬프를 조회할 수 없습니다.');
            }

            return fetchStampDetail(tripId, stampId);
        },
        enabled: !!token && !!tripId && !!stampId,
        staleTime: 60_000,
    });
};

export default useDetailStampQuery;

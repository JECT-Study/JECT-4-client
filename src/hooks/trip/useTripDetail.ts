import { getDefaultStore } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { sessionStorageAtom } from '@store/auth';
import { fetchTripDetail } from '../../services/trip/trip';
import type { TripDetail } from '../../types/trip/trip';

const useTripDetail = (tripId: number | null) => {
    const store = getDefaultStore();
    const token = store.get(sessionStorageAtom);

    return useQuery<TripDetail>({
        queryKey: ['tripDetail', tripId],
        queryFn: () => {
            if (!tripId) throw new Error('trip id를 조회할 수 없습니다.');
            return fetchTripDetail(tripId);
        },
        enabled: !!token && !!tripId,
        staleTime: 60_000,
    });
};

export default useTripDetail;

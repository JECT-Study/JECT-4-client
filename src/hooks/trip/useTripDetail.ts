import { useQuery } from '@tanstack/react-query';
import { fetchTripDetail, type TripDetail } from '../../services/trip/trip';

const useTripDetail = (tripId: number | null) => {
    return useQuery<TripDetail>({
        queryKey: ['tripDetail', tripId],
        queryFn: () => {
            if (!tripId) throw new Error('trip id를 조회할 수 없습니다.');
            return fetchTripDetail(tripId);
        },
        enabled: !!tripId,
        staleTime: 60_000,
    });
};

export default useTripDetail;

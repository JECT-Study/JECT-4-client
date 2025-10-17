import { useQuery } from '@tanstack/react-query';
import {
    fetchTripRetrospect,
    type TripRetrospect,
} from '../../services/trip/tripRetrospect';

const useTripRetrospect = (tripId: number | null) => {
    return useQuery<TripRetrospect>({
        queryKey: ['tripDetail', tripId],
        queryFn: () => {
            if (!tripId) throw new Error('trip id를 조회할 수 없습니다.');
            return fetchTripRetrospect(tripId);
        },
        enabled: !!tripId,
        staleTime: 60_000,
    });
};

export default useTripRetrospect;

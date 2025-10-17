import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import {
    fetchTripRetrospect,
    type TripRetrospect,
} from '../../services/trip/tripRetrospect';

const useTripRetrospect = (tripId: number, initialPageSize: number = 5) => {
    return useInfiniteQuery<
        TripRetrospect,
        Error,
        InfiniteData<TripRetrospect>,
        ['tripRetrospect', number],
        number
    >({
        queryKey: ['tripRetrospect', tripId],
        queryFn: async ({ pageParam = 0 }) => {
            if (!tripId) throw new Error('trip id를 조회할 수 없습니다.');
            return fetchTripRetrospect(tripId, pageParam, initialPageSize);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.history.hasNext ? allPages.length : undefined,
        enabled: !!tripId,
    });
};

export default useTripRetrospect;

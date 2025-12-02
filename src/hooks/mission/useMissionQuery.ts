import { useQuery } from '@tanstack/react-query';

import { getDefaultStore } from 'jotai';
import { sessionStorageAtom } from '@store/auth';
import { fetchMissions } from '@services/mission/missions';
import { type ServerMissionItem } from '../../types/mission/Mission';

const useMissionQuery = (tripId: number, stampId: number) => {
    const store = getDefaultStore();
    const token = store.get(sessionStorageAtom);

    return useQuery<ServerMissionItem[], Error>({
        queryKey: ['missions', tripId, stampId],
        queryFn: () => {
            if (!tripId && !stampId) {
                throw new Error('미션 목록 id를 조회할 수 없습니다.');
            }

            return fetchMissions(tripId, stampId);
        },
        enabled: !!token && !!tripId && !!stampId,
        staleTime: 60_000,
    });
};

export default useMissionQuery;

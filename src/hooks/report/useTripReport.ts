import { getDefaultStore } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import { accessTokenAtom } from '@store/auth';
import type { TripReports } from '../../types/report';
import { getTripReport } from '@services/report/report';

const useTripReport = () => {
    const store = getDefaultStore();
    const token = store.get(accessTokenAtom);

    return useQuery<TripReports>({
        queryKey: ['tripReports'],
        queryFn: () => getTripReport(),
        enabled: !!token,
    });
};

export default useTripReport;

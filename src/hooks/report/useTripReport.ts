import { useQuery } from '@tanstack/react-query';

import type { TripReports } from '../../types/report';
import { getTripReport } from '@services/report/report';

const useTripReport = () => {
    return useQuery<TripReports>({
        queryKey: ['tripReports'],
        queryFn: () => getTripReport(),
    });
};

export default useTripReport;

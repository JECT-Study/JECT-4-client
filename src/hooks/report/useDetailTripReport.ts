import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { getDetailTripReport } from '@services/report/report';

import type { DetailTripReport } from '../../types/report';

const useDetailTripReport = (
    tripReportId: number,
    initialPageSize: number = 5
) => {
    return useInfiniteQuery<
        DetailTripReport,
        Error,
        InfiniteData<DetailTripReport>,
        ['detailTripReport', number],
        number
    >({
        queryKey: ['detailTripReport', tripReportId],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await getDetailTripReport(
                tripReportId,
                pageParam,
                initialPageSize
            );

            return response;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.history.hasNext) return allPages.length + 1;
            return undefined;
        },
        enabled: !!tripReportId,
    });
};

export default useDetailTripReport;

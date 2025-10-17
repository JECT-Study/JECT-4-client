import useTripReport from '@hooks/report/useTripReport';

import LogCard from './_componenets/LogCard';
import TripCard from './_componenets/TripCard';
import Loading from '@components/common/Loading';

const MyHistoryPage = () => {
    const { data: reports, isLoading, isError } = useTripReport();

    if (isLoading) return <Loading />;

    if (isError) return null;
    if (!reports) return null;

    return (
        <div className="flex flex-col gap-10">
            <section className="pt-16">
                <h1 className="text-title text-secondary">나의 여행 기록</h1>
                <p className="text-small text-text-min">
                    소희 님의 여정이 담긴 한 권의 성장 기록을 확인해요.
                </p>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-text-min text-caption">지나온 여정들</p>
                <div className="flex gap-3">
                    <LogCard
                        type="trip"
                        count={reports.summary.completedTripCount}
                    />
                    <LogCard
                        type="study"
                        count={reports.summary.totalFocusHours}
                    />
                    <LogCard
                        type="longTrip"
                        count={reports.summary.longestFocusHours}
                    />
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-text-min text-caption">완료한 여행</p>
                <div className="flex h-[calc(100vh-28rem)] flex-col gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {reports.tripReports.map((trip) => (
                        <TripCard
                            key={trip.tripReportId}
                            reportId={trip.tripReportId}
                            title={trip.title}
                            time={trip.totalFocusHours}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                            imageUrl={trip.imageUrl}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MyHistoryPage;

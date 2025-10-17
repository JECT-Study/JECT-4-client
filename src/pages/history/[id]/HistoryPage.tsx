import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../_componenets/Header';
import { FirstSection, SecondSection, ThirdSection } from '../_layouts/';
import MissionHistory from '@components/history/MissionHistory';

import useDetailTripReport from '@hooks/report/useDetailTripReport';
import { formatDate } from '@utils/date';

const HistoryPage = () => {
    const navigate = useNavigate();

    const { tripReportId: tripReportIdParam } = useParams<{
        tripReportId: string;
    }>();

    const tripReportId = useMemo(() => {
        const number = Number(tripReportIdParam);
        return Number.isFinite(number) && number > 0 ? number : null;
    }, [tripReportIdParam]);

    if (tripReportId === null) {
        alert('잘못된 여행 id입니다.');
        navigate(-1);

        return null;
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useDetailTripReport(tripReportId, 5);

    const observerElem = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    const initialReport = useMemo(() => {
        return data?.pages?.[0];
    }, [data]);

    const historyList = useMemo(() => {
        const allStudyLogs =
            data?.pages?.flatMap((page) => page.history?.studyLogs || []) || [];

        return allStudyLogs.map((log) => {
            const date = log.createdAt.split(' ')[0];
            const formattedDate = formatDate(date);

            const contents: string[] = [];

            if (log.title) contents.push(log.title);

            log.dailyMissions.forEach((mission) => {
                contents.push(mission.missionName);
            });

            return {
                date: formattedDate,
                contents: contents,
            };
        });
    }, [data]);

    const goalCardContents = useMemo(() => {
        if (!initialReport) {
            return { learning: 0, session: 0, studyDays: 0 };
        }

        return {
            learning: initialReport.totalFocusHours,
            session: initialReport.studyLogCount,
            studyDays: initialReport.studyDays,
        };
    }, [initialReport]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px',
            threshold: 1.0,
        });

        const currentElem = observerElem.current;
        if (currentElem) observer.observe(currentElem);

        return () => {
            if (currentElem) observer.unobserve(currentElem);
        };
    }, [handleObserver]);

    if (isLoading) return <div>여행 기록을 불러오는 중입니다...</div>;
    if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
    if (!initialReport) return <p>여행 기록이 없습니다.</p>;

    return (
        <div>
            <Header text={initialReport.title} />
            <div className="flex h-[calc(100vh-8rem)] flex-col gap-6 overflow-auto pt-[5rem] [&::-webkit-scrollbar]:hidden">
                <FirstSection
                    goalCardContents={goalCardContents}
                    detailReport={initialReport}
                />
                <SecondSection content={initialReport.content} />
                {initialReport.imageUrl ? (
                    <ThirdSection detailReport={initialReport} />
                ) : null}
                <section>
                    <MissionHistory historyList={historyList} />
                    <div
                        ref={observerElem}
                        className="my-[0.625rem] h-[0.063rem]"
                    />
                </section>
            </div>
        </div>
    );
};

export default HistoryPage;

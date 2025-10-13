import { useEffect, useState, useRef, useCallback } from 'react';

import api from '@lib/axios';

import BackHeader from '@components/common/BackHeaderLayout';
import LogCard from './_components/LogCard';
import SearchIcon from '@assets/icons/search.svg?react';
import Dropdown from '@components/common/Dropdown';
import useValidatedTripId from '@hooks/common/useValidateTripId';

interface CompletedMission {
    studyLogDailyMissionId: number;
    missionName: string;
}

interface Log {
    studyLogId: number;
    title: string;
    content: string;
    createdAt: string;
    imageUrl: string | null;
    dailyMissions: CompletedMission[];
}

interface LogsResponse {
    studyLogs: Log[];
    hasNext: boolean;
}

const PAGE_SIZE = 5;

const LogListPage = () => {
    const tripId = useValidatedTripId();

    const [logs, setLogs] = useState<Log[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    const pageRef = useRef(0);
    const isFetchingRef = useRef(false);
    const observer = useRef<IntersectionObserver | null>(null);

    if (!tripId) return null;

    const fetchLogs = useCallback(
        async (reset = false) => {
            if (isFetchingRef.current) return;

            isFetchingRef.current = true;
            setIsFetching(true);

            try {
                const currentPage = reset ? 0 : pageRef.current;
                const response = await api.get(`/trips/${tripId}/study-logs`, {
                    params: { page: currentPage, size: PAGE_SIZE },
                });

                const logsResponse: LogsResponse = response.data.data;
                console.log(logsResponse);

                setLogs((prev) =>
                    reset
                        ? logsResponse.studyLogs
                        : [...prev, ...logsResponse.studyLogs]
                );

                setHasNext(logsResponse.hasNext);

                pageRef.current = reset ? 1 : pageRef.current + 1;
            } catch (error) {
                console.warn('데이터 불러오기 실패', error);
            } finally {
                isFetchingRef.current = false;
                setIsFetching(false);
            }
        },
        [tripId]
    );

    useEffect(() => {
        fetchLogs(true); // 첫 렌더 시
    }, [fetchLogs]);

    const lastLogRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNext &&
                    !isFetchingRef.current
                ) {
                    fetchLogs(false);
                }
            });

            if (node) observer.current.observe(node);
        },
        [hasNext, fetchLogs]
    );

    const handleSelect = (value: string) => {
        //TODO: 정렬 추가
        console.log('선택된 값:', value);
    };

    return (
        <div>
            <BackHeader title="미션 히스토리" hideLogButton />
            <div className="mb-6 flex flex-col items-center pt-20">
                <div className="text-text-sub bg-text-sub/20 flex w-full items-center gap-4 rounded-md px-4 py-2">
                    <SearchIcon />
                    <input
                        className="text-small w-full"
                        placeholder="어떤 기록을 찾을까요?"
                    />
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="mb-1.5">
                    <Dropdown
                        options={['최신순', '과거순']}
                        onSelect={handleSelect}
                    />
                </div>
                <div className="flex max-h-[calc(100vh-120px-100px)] w-full flex-col gap-2 overflow-y-auto">
                    {logs.map((log, index) => {
                        const isLast = index === logs.length - 1;
                        return (
                            <div
                                key={log.studyLogId}
                                ref={isLast ? lastLogRef : null}
                            >
                                <LogCard log={log} />
                            </div>
                        );
                    })}
                    {isFetching && (
                        <div className="py-4 text-center">로딩중...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogListPage;

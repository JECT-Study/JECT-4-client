import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@lib/axios';

import BackHeader from '@components/common/BackHeaderLayout';
import LogCard from './_components/LogCard';
import SearchIcon from '@assets/icons/search.svg?react';
import Dropdown from '@components/common/Dropdown';

interface CompletedMission {
    studyLogDailyMissionId: number;
    missionName: string;
}

interface Log {
    studyLogId: number;
    title: string;
    content: string;
    createdAt: string;
    dailyMissions: CompletedMission[];
}

interface LogsResponse {
    studyLogs: Log[];
    hasNext: boolean;
}

const LogListPage = () => {
    const { tripId: tripIdParam } = useParams<{ tripId: string }>();
    const navigate = useNavigate();

    const [logs, setLogs] = useState<Log[]>([]);

    /* 형변환 및 유효성 검증 시 tripId가 변경되지 않을 경우, 재계산을 하지 않기 위해 useMemo 사용 */
    const tripId = useMemo(() => {
        const number = Number(tripIdParam);

        return Number.isFinite(number) && number > 0 ? number : null;
    }, [tripIdParam]);

    useEffect(() => {
        if (tripId === null) {
            alert('잘못된 여행 id입니다.');
            navigate(-1);
        }
    }, [tripId, navigate]);

    if (tripId === null) return null;

    const handleSelect = (value: string) => {
        //TODO: 정렬 추가
        console.log('선택된 값:', value);
    };

    useEffect(() => {
        const getLogs = async () => {
            try {
                const response = await api.get(`/trips/${tripId}/study-logs`);

                const logsResponse: LogsResponse = response.data.data;
                setLogs(logsResponse.studyLogs);
                console.log(logs);
            } catch (error) {
                console.warn('데이터 불러오기 실패', error);
            }
        };
        getLogs();
    }, []);

    return (
        <div>
            <BackHeader title="미션 히스토리" hideLogButton />
            <div className="mb-6 flex flex-col items-center pt-20">
                <div className="text-text-sub bg-text-sub/20 flex w-full items-center gap-4 rounded-[6px] px-4 py-2">
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
                <div className="flex w-full flex-col gap-2">
                    {logs.map((log) => (
                        <LogCard key={log.studyLogId} log={log} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogListPage;

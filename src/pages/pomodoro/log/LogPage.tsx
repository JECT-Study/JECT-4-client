import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';

import api from '@lib/axios';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MainButton from '../../../components/common/button/MainButton';
import LogMissionItem from './LogMissionItem';
import { missionRefetchAtom } from '../../../store/mission';

interface DailyMission {
    dailyMissionId: number;
    missionName: string;
    checked: boolean;
}

const LogPage = () => {
    const missionRefetch = useAtomValue(missionRefetchAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const { tripId, stampId, dailyGoal } = location.state || {};
    console.log(dailyGoal);

    if (!tripId || !dailyGoal) {
        return null;
    }

    const isNextDisabled = false;
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const maxLength = 500;

    const percentage = Math.min(
        (dailyGoal.elapsedTime / dailyGoal.totalTime) * 100,
        100
    );
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const timeSpent = formatTime(dailyGoal.elapsedTime);

    const [checkedIds, setCheckedIds] = useState<number[]>(() =>
        dailyGoal
            ? dailyGoal.dailyMissions
                  .filter((mission: DailyMission) => mission.checked) // checked === true 인 것만
                  .map((mission: DailyMission) => mission.dailyMissionId) // id 배열로 변환
            : []
    );

    // 체크 토글 함수
    const handleToggle = (id: number) => {
        setCheckedIds((prev) =>
            prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
        );
    };

    const handleComplete = async () => {
        try {
            await api.post(
                `trips/${tripId}/daily-goals/${dailyGoal.dailyGoalId}/study-logs`,
                {
                    totalFocusTimeInMinutes: dailyGoal.elapsedTime,
                    selectedDailyMissionIds: checkedIds,
                    content: text,
                }
            );

            if (missionRefetch) await missionRefetch();

            alert('공부 기록이 생성되었습니다.');

            navigate(`/trip/${tripId}/dashboard?stampId=${stampId}`, {
                replace: true,
            });

            console.log('로그 생성 성공');
        } catch (error) {
            console.warn('로그 생성 실패', error);
        }
    };

    useEffect(() => {
        // 초기 히스토리 스택 세팅
        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            alert(
                '기록 작성 중에는 이동할 수 없습니다. 확인 버튼을 눌러 마무리해주세요.'
            );
            // 다시 현재 페이지로 히스토리 유지
            window.history.pushState(null, '', window.location.href);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <section className="pt-16">
                <h1 className="text-title text-secondary">
                    오늘의 작은 승리, 잘 마쳤어요!
                </h1>
                <p className="text-small text-text-min">
                    집중 세션이 끝났어요. 무엇을 해냈는지 남겨볼까요?
                </p>
                {isOpen ? (
                    <div className="pt-16">
                        <div className="bg-point2 flex flex-col items-center justify-center gap-7 rounded-xl px-6 py-4 text-white shadow-[4px_2px_20px_10px_rgba(248,190,102,0.2)]">
                            <div className="text-[18px] font-semibold">
                                {dailyGoal.title}
                            </div>
                            <div className="text-text-sub w-full">
                                <div className="text-body flex max-h-40 flex-col items-baseline gap-3 overflow-y-auto">
                                    <div className="text-body flex max-h-40 flex-col items-baseline gap-3 overflow-y-auto">
                                        {dailyGoal.dailyMissions.map(
                                            (mission: any) => (
                                                <LogMissionItem
                                                    key={mission.dailyMissionId}
                                                    id={mission.dailyMissionId}
                                                    name={mission.missionName}
                                                    checked={checkedIds.includes(
                                                        mission.dailyMissionId
                                                    )}
                                                    onToggle={handleToggle}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="-mt-5 w-full">
                                <div className="text-caption text-text-sub flex justify-end">
                                    {text.length}/{maxLength}
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    maxLength={maxLength}
                                    placeholder="기록하고 싶은 내용을 남겨주세요."
                                    className="text-background text-small flex w-full justify-center rounded-md border border-white bg-white/20 p-3"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pt-16" onClick={() => setIsOpen(true)}>
                        <div className="text-text-sub flex flex-col items-center justify-center gap-8 rounded-xl bg-white p-8 shadow-[4px_2px_20px_10px_rgba(248,190,102,0.2)]">
                            <div className="text-[18px] font-semibold">
                                {dailyGoal.title}
                            </div>
                            <div
                                className="relative inline-block rounded-full font-bold shadow-[0_12px_15px_rgba(255,178,102,0.35)]"
                                style={{ width: 200 }}
                            >
                                <svg className="h-0">
                                    <defs>
                                        <linearGradient
                                            id="gradientId"
                                            x1="100%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#F8BE66"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#FD9230"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <CircularProgressbar
                                    value={percentage}
                                    text={timeSpent}
                                    strokeWidth={9}
                                    styles={buildStyles({
                                        pathColor: `url(#gradientId)`,
                                        trailColor: '#EEE7D8',
                                        textColor: '#895C41',
                                        textSize: '20px',
                                    })}
                                />
                            </div>
                            <div className="text-[18px] font-semibold">
                                탭해서 회고하기
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {isOpen && (
                <section className="py-16">
                    <MainButton
                        disabled={isNextDisabled}
                        onClick={handleComplete}
                        colorClass="bg-text-sub"
                    >
                        확인
                    </MainButton>
                </section>
            )}
        </div>
    );
};

export default LogPage;

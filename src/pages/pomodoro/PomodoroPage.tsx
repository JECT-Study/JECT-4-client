import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PomodoroTimer from './PomodoroTimer';
import PomodoroButton from './PomodoroButton';
import PomodoroMissionModal from './PomodoroMissionModal';
import BackHeader from '@components/common/BackHeaderLayout';
import ConfirmModal from '@components/common/ConfirmModal';
import { clearPomodoroStorage } from '@constants/pomodoroLocalStorageKey';

import api from '@lib/axios';

interface DailyMission {
    dailyMissionId: number;
    missionName: string;
}

const PomodoroPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // state로 받아오는 기본값들
    const [tripId, setTripId] = useState<Number>(0);
    const [stampId, setStampId] = useState<Number>(0);
    const [stampName, setStampName] = useState('');
    const [time, setTime] = useState<{ minute: number; session: number }>({
        minute: 0,
        session: 0,
    });
    const [checkedMissionIds, setCheckedMissionIds] = useState([]);

    const [dailyGoalId, setDailyGoalId] = useState(0);
    const [dailyMissions, setDailyMissions] = useState<DailyMission[]>([]);

    const dailyGoalIdRef = useRef(dailyGoalId);
    const dailyMissionsRef = useRef(dailyMissions);
    const [isModalOpen, setIsModalOpen] = useState(false); // 중지 확인 모달

    const isMounted = useRef(false); // 마운트 여부

    // 처음 페이지 로딩 시 미션 목록 세팅하기
    useEffect(() => {
        //localStorge에 넣은 데이터가 존재할 때(새로고침 했을 때)
        if (localStorage.getItem('saveLocalStorage') == 'true') {
            // 데이터 전부 불러와서 변수에 세팅
            const savedState = localStorage.getItem('state');
            if (savedState) {
                const { tripId, stampId, stampName, time, checkedMissionIds } =
                    JSON.parse(savedState);

                setTripId(Number(tripId));
                setStampId(Number(stampId));
                setStampName(stampName);
                setTime({
                    minute: Number(time.minute),
                    session: Number(time.session),
                });
                setCheckedMissionIds(checkedMissionIds);
            }

            const savedIsState = localStorage.getItem('isState');
            if (savedIsState) {
                const { isStarted, isRunning, isAutoStop } =
                    JSON.parse(savedIsState);
                setIsStarted(Boolean(isStarted));
                setIsRunning(Boolean(isRunning));
                setIsAutoStop(Boolean(isAutoStop));
            }

            const savedSessionState = localStorage.getItem('sessionState');
            if (savedSessionState) {
                const { elapsedTime, sessionElapsedTime, currentSession } =
                    JSON.parse(savedSessionState);
                elapsedTimeRef.current = Number(elapsedTime);
                setSessionElapsedTime(Number(sessionElapsedTime));
                setCurrentSession(Number(currentSession));
            }

            const savedMissionState = localStorage.getItem('missionState');
            if (savedMissionState) {
                const dailyMissions = JSON.parse(savedMissionState);
                setDailyMissions(dailyMissions);
            }

            const savedDailyGoalId = localStorage.getItem('dailyGoalIdState');
            if (savedDailyGoalId) {
                const dailyGoalId = JSON.parse(savedDailyGoalId);
                setDailyGoalId(dailyGoalId);
            }

            const savedCheckedMission = localStorage.getItem(
                'checkedMissionState'
            );
            if (savedCheckedMission) {
                nowCheckedMissionIdsRef.current =
                    JSON.parse(savedCheckedMission);
            }
        } else {
            // localStorage에 저장된 데이터가 없을 경우(해당 페이지에 처음 진입했을 경우)
            const { tripId, stampId, stampName, time, checkedMissionIds } =
                location.state || {};
            setTripId(Number(tripId));
            setStampId(Number(stampId));
            setStampName(stampName);
            setTime({
                minute: Number(time.minute),
                session: Number(time.session),
            });
            setCheckedMissionIds(checkedMissionIds);

            localStorage.setItem(
                'state',
                JSON.stringify({
                    tripId,
                    stampId,
                    stampName,
                    time,
                    checkedMissionIds,
                })
            );
            //isState, sessionState, missionState는 해당 단계에서 기본 값 저장
            localStorage.setItem(
                'isState',
                JSON.stringify({ isStarted, isRunning, isAutoStop })
            );
            localStorage.setItem(
                'sessionState',
                JSON.stringify({
                    elapsedTime: elapsedTimeRef.current,
                    sessionElapsedTime,
                    currentSession,
                })
            );

            //시작 버튼 안눌렀을 경우
            if (!isStarted) {
                // 처음 미션 세팅
                const fetchMissions = async () => {
                    try {
                        const response = await api.get(
                            `/trips/${tripId}/stamps/${stampId}/missions`
                        );

                        console.log('미션 목록 불러오기 성공');
                        const missions = response.data.data; // 서버에서 받아온 전체 미션 목록
                        const selectedMissions: DailyMission[] = missions
                            .filter((mission: any) =>
                                checkedMissionIds.includes(mission.missionId)
                            )
                            .map((mission: any, index: number) => ({
                                dailyMissionId: index, // 지금은 임시로 인덱스 사용
                                missionName: mission.missionName,
                            }));
                        setDailyMissions(selectedMissions);
                        localStorage.setItem(
                            'missionState',
                            JSON.stringify(selectedMissions)
                        );
                        setIsMissionLoaded(true);
                    } catch (error) {
                        console.error('미션 목록 불러오기 실패:', error);
                    }
                };
                fetchMissions();
            }

            localStorage.setItem('saveLocalStorage', 'true');
        }
    }, []);

    const totalTime = Number(time.minute) * Number(time.session) * 60; // 전체시간
    const [isRunning, setIsRunning] = useState(false); //타이머가 작동 중인지 여부
    const [isStarted, setIsStarted] = useState(false); //타이머가 시작했는지 여부
    const [isAutoStop, setIsAutoStop] = useState(false); // 한 세션이 끝나서 멈췄을 경우
    const [isMissionLoaded, setIsMissionLoaded] = useState(false); // 미션 불러오기 완료 여부
    const nowCheckedMissionIdsRef = useRef<number[]>([]); // 완료된 미션 객체 실시간 값

    const intervalRef = useRef<number | null>(null);
    const elapsedTimeRef = useRef(0); //총 경과한 시간
    const [sessionElapsedTime, setSessionElapsedTime] = useState(0); //현재 세션에서 경과한 시간(초)
    const [currentSession, setCurrentSession] = useState(0); // 진행 중인 세션 번호

    const sessionLength = Number(time.minute) * 60; // 한 세션 길이
    const completedSessions = Math.ceil(elapsedTimeRef.current / sessionLength);

    const handleCheckedChange = (ids: number[]) => {
        nowCheckedMissionIdsRef.current = ids; // 항상 최신 값 유지
    };

    useEffect(() => {
        dailyMissionsRef.current = dailyMissions;
    }, [dailyMissions]);

    useEffect(() => {
        dailyGoalIdRef.current = dailyGoalId;
    }, [dailyGoalId]);

    const endingAction = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        const finalElapsedTime = elapsedTimeRef.current;

        // 완료 미션 담아서 넘기기
        console.log(dailyGoalIdRef);
        const updatedDailyGoal = {
            dailyGoalId: dailyGoalIdRef.current,
            title: stampName,
            elapsedTime: finalElapsedTime,
            totalTime,
            dailyMissions: dailyMissionsRef.current.map((mission) => ({
                ...mission,
                checked: nowCheckedMissionIdsRef.current.includes(
                    mission.dailyMissionId
                ),
            })),
        };

        clearPomodoroStorage();

        navigate('/log', {
            replace: true,
            state: {
                tripId: tripId,
                stampId: stampId,
                dailyGoal: updatedDailyGoal,
            },
        });
    };

    useEffect(() => {
        if (!isRunning) {
            if (isAutoStop) {
                setSessionElapsedTime(0);
                return;
            } else return;
        }

        const start = Date.now() - elapsedTimeRef.current * 1000;

        intervalRef.current = window.setInterval(() => {
            const nowElapsed = Math.floor((Date.now() - start) / 1000); //현재 진행한 총 시간
            const nowSessionElapsed =
                nowElapsed - Number(time.minute) * 60 * currentSession;
            elapsedTimeRef.current = nowElapsed;
            setSessionElapsedTime(nowSessionElapsed);

            if (nowSessionElapsed >= sessionLength) {
                //현재 경과시간이 초과했을 때
                setIsRunning(false); // 자동 멈춤
                setIsAutoStop(true);
            }

            if (nowElapsed >= totalTime) {
                endingAction();
            }
        }, 1000);

        return () => clearInterval(intervalRef.current!);
    }, [isRunning]);

    const handleStart = () => {
        //데일리 목표 세팅
        const postAndSetDailyGoal = async () => {
            try {
                const response = await api.post(
                    `/trips/${tripId}/daily-goals`,
                    {
                        pomodoro: {
                            focusDurationInMinute: Number(time.minute),
                            focusSessionCount: Number(time.session),
                        },
                        missionIds: checkedMissionIds,
                    }
                );

                console.log('데일리 목표 생성');

                const nowDailyGoalId = response.data.data.dailyGoalId;
                setDailyGoalId(nowDailyGoalId);

                const getResponse = await api.get(
                    `/trips/${tripId}/daily-goals/${nowDailyGoalId}`
                );

                setDailyMissions(getResponse.data.data.dailyMissions);
            } catch (error) {
                console.error('데일리 목표 불러오기 실패:', error);
            }
        };
        postAndSetDailyGoal();

        setIsStarted(true);
        setIsRunning(true);
    };

    const handlePause = () => setIsRunning(false);
    const handleResume = () => {
        if (isAutoStop) {
            // 휴식 후 재시작할 경우
            setCurrentSession((prev) => prev + 1); // 세션 번호 증가
        }
        setIsRunning(true);
        setIsAutoStop(false);
    };
    const handleReset = () => {
        setIsModalOpen(true);

        setIsStarted(false);
        setIsRunning(false);
        setIsAutoStop(false);
        setSessionElapsedTime(0);
        setCurrentSession(0);

        endingAction();
    };

    // PWA용 뒤로가기 방지
    useEffect(() => {
        if (!isStarted) {
            return;
        }

        // 초기 히스토리 스택 세팅
        window.history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            alert(
                '학습 중에는 이동할 수 없습니다. 중지 버튼을 눌러 학습을 종료해주세요.'
            );
            // 다시 현재 페이지로 히스토리 유지
            window.history.pushState(null, '', window.location.href);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isStarted]);

    // 새로고침 시 진행시간 데이터만 추가로 저장
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();

            localStorage.setItem(
                'dailyGoalIdState',
                JSON.stringify(dailyGoalIdRef.current)
            );

            localStorage.setItem(
                'sessionState',
                JSON.stringify({
                    elapsedTime: elapsedTimeRef.current,
                    sessionElapsedTime:
                        elapsedTimeRef.current -
                        time.minute * 60 * currentSession,
                    currentSession,
                })
            );

            localStorage.setItem(
                'missionState',
                JSON.stringify(dailyMissionsRef.current)
            );

            localStorage.setItem(
                'checkedMissionState',
                JSON.stringify(nowCheckedMissionIdsRef.current)
            );
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // 진행 상태가 바뀔 때마다 localStorage에 저장
    useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem(
                'isState',
                JSON.stringify({ isStarted, isRunning, isAutoStop })
            );
        } else {
            isMounted.current = true; // 첫 렌더링은 무시
        }
    }, [isStarted, isRunning, isAutoStop]);

    return (
        <div>
            <BackHeader
                title={!isStarted ? stampName : ''}
                hideBackButton={isStarted}
            />
            <div className="flex flex-col items-center pt-20">
                <PomodoroTimer
                    duration={sessionLength}
                    elapsedTime={sessionElapsedTime}
                    width={250}
                />
                {/* 세션 점 표시 */}
                <div className="mt-4 flex gap-2">
                    {Array.from({
                        length: Number(time.session),
                    }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index < completedSessions
                                    ? 'bg-point2'
                                    : 'bg-main-gray'
                            }`}
                        />
                    ))}
                </div>

                <div className="mt-9 w-full">
                    <PomodoroMissionModal
                        stampName={stampName}
                        isMissionLoaded={isMissionLoaded}
                        isAutoStop={isAutoStop}
                        focusDurationInMinute={time.minute}
                        dailyMissions={dailyMissions ?? []}
                        checkedIds={nowCheckedMissionIdsRef.current}
                        onCheckedChange={handleCheckedChange}
                    />
                    <PomodoroButton
                        isRunning={isRunning}
                        isStarted={isStarted}
                        onStart={handleStart}
                        onPause={handlePause}
                        onResume={handleResume}
                        onReset={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleReset}
                title={
                    <div className="text-subtitle text-secondary flex flex-col items-center px-8 text-center font-semibold">
                        오늘의 학습을 마무리하고
                        <br /> 기록 화면으로 이동할까요?
                    </div>
                }
            />
        </div>
    );
};

export default PomodoroPage;

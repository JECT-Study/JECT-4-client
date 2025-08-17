import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PomodoroTimer from './PomodoroTimer';
import PomodoroButton from './PomodoroButton';
import PomodoroMissionModal from './PomodoroMissionModal';
import BackHeader from '@components/common/BackHeaderLayout';
import ConfirmModal from '@components/common/ConfirmModal';

import api from '@lib/axios';

interface Pomodoro {
    pomodoroId: number;
    focusDurationInMinute: number;
    focusSessionCount: number;
}

interface DailyMission {
    dailyMissionId: number;
    missionName: string;
}

interface nowDailyGoal {
    dailyGoalId: number;
    completed: boolean;
    title: string;
    pomodoro: Pomodoro;
    elapsedTime: number;
    dailyMissions: DailyMission[];
}

const defaultDailyGoal: nowDailyGoal = {
    dailyGoalId: 0,
    completed: false,
    title: '스탬프 이름',
    pomodoro: {
        pomodoroId: 0,
        focusDurationInMinute: 0,
        focusSessionCount: 0,
    },
    elapsedTime: 0,
    dailyMissions: [],
};

const PomodoroPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { tripId, stampId, stampName, time, checkedMissionIds } =
        location.state || {};
    console.log(tripId, stampId, stampName, time, checkedMissionIds);
    const [dailyGoal, setDailyGoal] = useState(defaultDailyGoal);
    const [isModalOpen, setIsModalOpen] = useState(false); // 중지 확인 모달

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get(
                    `/trips/${tripId}/stamps/${stampId}/missions`
                );

                console.log('미션 목록 불러오기 성공:');
                const missions = response.data.data; // 서버에서 받아온 전체 미션 목록
                const selectedMissions = missions.filter((mission: any) =>
                    checkedMissionIds.includes(mission.missionId)
                );

                setDailyGoal((prev) => ({
                    ...prev,
                    dailyMissions: selectedMissions, // checkedMissionIds에 해당하는 미션만 세팅
                }));
            } catch (error) {
                console.error('미션 목록 불러오기 실패:', error);
            }
        };
        fetchMissions();
    }, []);

    const totalTime = time.minute * time.session * 60; // 전체시간
    const [isRunning, setIsRunning] = useState(false); //타이머가 작동 중인지 여부
    const [isStarted, setIsStarted] = useState(false); //타이머가 시작했는지 여부
    const [isAutoStop, setIsAutoStop] = useState(false);
    const [nowCheckedMissionIds, setCheckedMissionIds] = useState<number[]>([]); //완료된 미션 객체 넘기기

    const intervalRef = useRef<number | null>(null);
    const elapsedTimeRef = useRef(0); //총 경과한 시간
    const [sessionElapsedTime, setSessionElapsedTime] = useState(0); //현재 세션에서 경과한 시간(초)
    const [currentSession, setCurrentSession] = useState(0); // 진행 중인 세션 번호

    const sessionLength = time.minute * 60;
    const completedSessions = Math.ceil(elapsedTimeRef.current / sessionLength);

    const endingAction = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        const finalElapsedTime = elapsedTimeRef.current;

        // 완료 미션 담아서 넘기기
        const updatedDailyGoal = {
            ...dailyGoal,
            elapsedTime: finalElapsedTime,
            dailyMissions: dailyGoal.dailyMissions.map((mission) => ({
                ...mission,
                checked: nowCheckedMissionIds.includes(mission.dailyMissionId),
            })),
        };

        navigate('/log', {
            replace: true,
            state: { tripId: tripId, dailyGoal: updatedDailyGoal },
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
                nowElapsed - time.minute * 60 * currentSession;
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

                console.log('데일리 목표 생성:');

                const dailyGoalId = response.data.data.dailyGoalId;

                const getResponse = await api.get(
                    `/trips/${tripId}/daily-goals/${dailyGoalId}`
                );
                setDailyGoal(getResponse.data.data);
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
                        length: dailyGoal.pomodoro.focusSessionCount,
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
                        isStarted={isStarted}
                        isAutoStop={isAutoStop}
                        focusDurationInMinute={time.minute}
                        dailyMissions={dailyGoal.dailyMissions}
                        onCheckedChange={setCheckedMissionIds}
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

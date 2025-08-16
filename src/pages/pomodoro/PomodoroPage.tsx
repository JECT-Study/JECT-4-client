import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PomodoroTimer from './PomodoroTimer';
import PomodoroButton from './PomodoroButton';
import PomodoroMissionModal from './PomodoroMissionModal';
import BackHeader from '../../components/common/BackHeaderLayout';

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

interface DailyGoal {
    dailyGoalId: number;
    completed: boolean;
    title: string;
    pomodoro: Pomodoro;
    elapsedTime: number;
    dailyMissions: DailyMission[];
}

const defaultDailyGoal: DailyGoal = {
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
    const tripId = 15; // 임시
    const dailyGoalId = 1; // 임시
    const [dailyGoal, setDailyGoal] = useState(defaultDailyGoal);

    useEffect(() => {
        const fetchDailyGoal = async () => {
            try {
                const response = await api.get(
                    `/trips/${tripId}/daily-goals/${dailyGoalId}`
                );

                console.log('데일리 목표 불러오기 성공:', response.data.data);
                setDailyGoal(response.data.data);
            } catch (error) {
                console.error('데일리 목표 불러오기 실패:', error);
            }
        };
        fetchDailyGoal();
    }, []);

    // TODO : 스탬프 이름 출력
    // TODO : 완료한 미션 ID 담아서 넘기기
    const totalTime =
        dailyGoal.pomodoro.focusDurationInMinute *
        dailyGoal.pomodoro.focusSessionCount *
        60; // 총 75분
    const [elapsedTime, setElapsedTime] = useState(0); //경과한 시간(초)
    const [isRunning, setIsRunning] = useState(false); //타이머가 작동 중인지 여부
    const [isStarted, setIsStarted] = useState(false); //타이머가 시작했는지 여부
    const intervalRef = useRef<number | null>(null);
    const [isAutoStop, setIsAutoStop] = useState(false);
    const [checkedMissionIds, setCheckedMissionIds] = useState<number[]>([]); //완료된 미션 객체 넘기기

    const sessionLength = dailyGoal.pomodoro.focusDurationInMinute * 60;
    const completedSessions = Math.ceil(elapsedTime / sessionLength);

    // 자동 정지 타이밍 계산
    const getPausePoints = (duration: number, step: number) => {
        if (step <= 0) return [];
        return Array.from({ length: step - 1 }, (_, i) => duration * (i + 1));
    };

    const shouldPauseAt = useRef<number[]>(
        getPausePoints(
            dailyGoal.pomodoro.focusDurationInMinute * 60,
            dailyGoal.pomodoro.focusSessionCount
        )
    );

    useEffect(() => {
        shouldPauseAt.current = getPausePoints(
            dailyGoal.pomodoro.focusDurationInMinute * 60,
            dailyGoal.pomodoro.focusSessionCount
        );
    }, [totalTime, dailyGoal]);

    const endingAction = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        const finalElapsedTime = elapsedTime;
        setElapsedTime(finalElapsedTime);

        // 완료 미션 담아서 넘기기
        const updatedDailyGoal = {
            ...dailyGoal,
            elapsedTime: finalElapsedTime,
            dailyMissions: dailyGoal.dailyMissions.map((mission) => ({
                ...mission,
                checked: checkedMissionIds.includes(mission.dailyMissionId),
            })),
        };

        navigate('/log', {
            replace: true,
            state: { tripId: tripId, dailyGoal: updatedDailyGoal },
        });
    };

    useEffect(() => {
        if (!isRunning) return;

        const start = Date.now() - elapsedTime * 1000;

        intervalRef.current = window.setInterval(() => {
            const nowElapsed = Math.floor((Date.now() - start) / 1000);
            setElapsedTime(nowElapsed);

            if (shouldPauseAt.current.includes(nowElapsed)) {
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
        setIsStarted(true);
        setIsRunning(true);
    };

    const handlePause = () => setIsRunning(false);
    const handleResume = () => {
        setIsRunning(true);
        setIsAutoStop(false);
    };
    const handleReset = () => {
        setIsStarted(false);
        setIsRunning(false);
        setIsAutoStop(false);
        setElapsedTime(0);

        endingAction();
    };

    return (
        <div>
            <BackHeader
                title={!isRunning ? dailyGoal.title : ''}
                hideBackButton={isStarted}
            />
            <div className="flex flex-col items-center pt-20">
                <PomodoroTimer
                    duration={totalTime}
                    elapsedTime={elapsedTime}
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
                        stampName={dailyGoal.title}
                        isAutoStop={isAutoStop}
                        focusDurationInMinute={
                            dailyGoal.pomodoro.focusDurationInMinute
                        }
                        dailyMissions={dailyGoal.dailyMissions}
                        onCheckedChange={setCheckedMissionIds}
                    />
                    <PomodoroButton
                        isRunning={isRunning}
                        isStarted={isStarted}
                        onStart={handleStart}
                        onPause={handlePause}
                        onResume={handleResume}
                        onReset={handleReset}
                    />
                </div>
            </div>
        </div>
    );
};

export default PomodoroPage;

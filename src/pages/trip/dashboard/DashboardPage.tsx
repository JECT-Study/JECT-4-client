import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MissionListSection from './_components/MissionListSection';
import MissionSummary from './_components/MissionSummary';
import ModalContainer from './_components/PomodoroTimer/ModalContainer';
import PomodoroTimer, {
    type TimeValue,
} from './_components/PomodoroTimer/PomodoroTimer';

import { useDashboardMissions } from './_hooks/useDashboardMissions';
import useVaildateId from './_hooks/useVaildateId';

import BackHeader from '../../../components/common/BackHeaderLayout';
import MainButton from '../../../components/common/button/MainButton';
import useMissionQuery from '../../../hooks/mission/useMissionQuery';
import { type DailyGoal } from '../../../types/dailyGoal';
import useCreateDailyGoal, {
    type CreateDailyGoalSuccessResponse,
} from '../../../hooks/dailyGoal/useCreateDailyGoal';

export default function DashboardPage() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState<TimeValue>({ minute: '30', session: '1' });

    const navigate = useNavigate();

    const id = useVaildateId();

    if (id === null) return null;

    const {
        data: fetchedMissions,
        isLoading,
        isError,
    } = useMissionQuery(id.tripId!, id.stampId!);

    const { mutateCreateDailyGoal } = useCreateDailyGoal({
        onSuccess: (data: CreateDailyGoalSuccessResponse) => {
            const dailyGoalId = data?.dailyGoalId;

            navigate('/pomodoro', {
                state: {
                    time,
                    tripId: id.tripId,
                    dailyGoalId,
                },
            });
        },
        onError: () => {
            alert('데일리 목표 추가를 실패했습니다.');
        },
    });

    const {
        missions,
        allChecked,
        checkedCount,
        checkedMissionIds,
        addMission,
        updateLabel,
        deleteMission,
        toggleCheck,
        updateMissionOrder,
    } = useDashboardMissions(id.tripId!, id.stampId!, fetchedMissions);

    if (isLoading) return <div>미션 목록 로드 중...</div>;
    if (isError) alert('미션 목록을 불러올 수 없습니다.');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        setOpen(false);

        const payloadDailyGoal: DailyGoal = {
            pomodoro: {
                focusDurationInMinute: Number(time.minute),
                focusSessionCount: Number(time.session),
            },
            missionIds: checkedMissionIds,
        };

        mutateCreateDailyGoal({
            tripId: id.tripId!,
            dailyGoal: payloadDailyGoal,
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="h-[4rem]">
                <BackHeader title="유형연습 Q8-10 복습" hideLogButton={false} />
            </div>

            <div className="flex-1 overflow-y-auto pt-3">
                <MissionSummary
                    missions={missions}
                    checkedCount={checkedCount}
                />
                <MissionListSection
                    tripId={id.tripId!}
                    stampId={id.stampId!}
                    missions={missions}
                    allChecked={allChecked}
                    checkedCount={checkedCount}
                    isEditMode={isEditMode}
                    addMission={addMission}
                    onToggleEditMode={() => setIsEditMode((prev) => !prev)}
                    onUpdateLabel={updateLabel}
                    onDelete={deleteMission}
                    onToggleCheck={toggleCheck}
                    onUpdateMissionOrder={updateMissionOrder}
                />
            </div>

            <div className="pb-6">
                <MainButton onClick={handleOpen} colorClass="bg-text-sub">
                    {allChecked ? '스탬프 완료하기' : '학습 시작하기'}
                </MainButton>
            </div>

            {/* 모달 */}
            <ModalContainer
                open={open}
                title="뽀모도 시간"
                confirmText="완료"
                cancelText="취소"
                onClose={handleClose}
                onConfirm={handleConfirm}
            >
                <div className="flex items-center justify-center py-[2rem]">
                    <PomodoroTimer value={time} onChange={setTime} />
                </div>
            </ModalContainer>
        </div>
    );
}

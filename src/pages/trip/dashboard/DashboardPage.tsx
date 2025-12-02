import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router-dom';

import MissionListSection from './_components/MissionListSection';
import MissionSummary from './_components/MissionSummary';
import ModalContainer from './_components/PomodoroTimer/ModalContainer';
import PomodoroTimer, {
    type TimeValue,
} from './_components/PomodoroTimer/PomodoroTimer';

import { useDashboardMissions } from './_hooks/useDashboardMissions';
import useVaildateId from './_hooks/useVaildateId';

import BackHeader from '@components/common/BackHeaderLayout';
import MainButton from '@components/common/button/MainButton';

import useMissionQuery from '@hooks/mission/useMissionQuery';
import useDetailStampQuery from '@hooks/stamp/useDetailStampQuery';
import useCompleteStamp from '@hooks/stamp/useCompleteStamp';

import { missionRefetchAtom } from '@store/mission';

import { clearAllStorage } from '@constants/pomodoroLocalStorageKey';

export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const stampId = searchParams.get('stampId');
    const [isEditMode, setIsEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState<TimeValue>({ minute: '25', session: '3' });

    const [, setMissionRefetch] = useAtom(missionRefetchAtom);

    const navigate = useNavigate();
    const id = useVaildateId();

    if (id === null) return null;

    const {
        data: fetchedMissions,
        isError: isMissionError,
        refetch,
    } = useMissionQuery(id.tripId!, id.stampId!);

    useEffect(() => {
        clearAllStorage();
    }, []);

    useEffect(() => {
        setMissionRefetch(() => refetch);
    }, [refetch, setMissionRefetch]);

    const { data: fetchedStamp, isError: isStampError } = useDetailStampQuery(
        id.tripId!,
        id.stampId!
    );

    const { mutateCompleteStamp } = useCompleteStamp();

    const handleToggleEditMode = useCallback(() => {
        setIsEditMode((prev) => !prev);
    }, []);

    const {
        missions,
        allCompletedMission,
        completedCount,
        checkedMissionIds,
        addMission,
        updateLabel,
        deleteMission,
        toggleCheck,
        handleToggleEdit,
    } = useDashboardMissions(id.tripId!, id.stampId!, fetchedMissions);

    if (isMissionError) alert('미션 목록을 불러올 수 없습니다.');
    if (isStampError) alert('스탬프를 로드할 수 없습니다.');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const checkedCount = checkedMissionIds.length;

    const buttonText = allCompletedMission
        ? '스탬프 완료하기'
        : '학습 시작하기';

    const handleButtonClick = () => {
        if (buttonText === '학습 시작하기' && missions.length && checkedCount) {
            handleOpen();
        }

        if (buttonText === '스탬프 완료하기') {
            mutateCompleteStamp({ tripId: id.tripId!, stampId: id.stampId! });
            navigate(`/trip/${id.tripId}`);
        }
    };

    const handleBack = () => {
        navigate(`/trip/${id.tripId}`);
    };

    const handleConfirm = () => {
        setOpen(false);
        navigate('/pomodoro', {
            state: {
                time,
                stampId: stampId,
                stampName: fetchedStamp?.stampName,
                tripId: id.tripId,
                checkedMissionIds,
            },
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col">
            <div className="h-[4rem]">
                <BackHeader
                    title={fetchedStamp?.stampName}
                    hideLogButton={false}
                    onBack={handleBack}
                />
            </div>

            <div className="flex-1 overflow-y-auto pt-3">
                <MissionSummary
                    missions={missions}
                    completedCount={completedCount}
                />
                <MissionListSection
                    missions={missions}
                    completedCount={completedCount}
                    isEditMode={isEditMode}
                    allCompleted={allCompletedMission}
                    onToggleEditMode={handleToggleEditMode}
                    addMission={addMission}
                    onUpdateLabel={updateLabel}
                    onDelete={deleteMission}
                    onToggleCheck={toggleCheck}
                    handleToggleEdit={handleToggleEdit}
                />
            </div>

            <div className="pb-6">
                <MainButton
                    disabled={
                        !allCompletedMission &&
                        (!missions.length || !checkedCount)
                    }
                    onClick={handleButtonClick}
                    colorClass={
                        !allCompletedMission &&
                        (!missions.length || !checkedCount)
                            ? 'bg-[#E2E2E2]'
                            : 'bg-text-sub'
                    }
                >
                    {buttonText}
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

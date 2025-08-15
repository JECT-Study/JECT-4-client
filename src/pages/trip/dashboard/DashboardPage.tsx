import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MissionListSection from './_components/MissionListSection';
import MissionSummary from './_components/MissionSummary';
import { useDashboardMissions } from './_hooks/useDashboardMissions';
import ModalContainer from './_components/PomodoroTimer/ModalContainer';
import PomodoroTimer, {
    type TimeValue,
} from './_components/PomodoroTimer/PomodoroTimer';

import BackHeader from '../../../components/common/BackHeaderLayout';
import MainButton from '../../../components/common/button/MainButton';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        missions,
        allChecked,
        checkedCount,
        toggleEdit,
        toggleCheck,
        updateLabel,
        deleteMission,
        addMission,
    } = useDashboardMissions([]);

    const [open, setOpen] = useState(false);
    const [time, setTime] = useState<TimeValue>({ minute: '30', session: '1' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        setOpen(false);
        navigate('/pomodoro');
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
                    missions={missions}
                    allChecked={allChecked}
                    checkedCount={checkedCount}
                    isEditMode={isEditMode}
                    onToggleEditMode={() => setIsEditMode((prev) => !prev)}
                    onAddMission={addMission}
                    onUpdateLabel={updateLabel}
                    onDelete={deleteMission}
                    onToggleEdit={toggleEdit}
                    onToggleCheck={toggleCheck}
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

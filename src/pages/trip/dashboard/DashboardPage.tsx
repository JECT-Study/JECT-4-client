import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MissionListSection from './_components/MissionListSection';
import MissionSummary from './_components/MissionSummary';
import { useDashboardMissions } from './_hooks/useDashboardMissions';

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

    return (
        <div className="relative flex min-h-screen flex-col">
            {/* 상단 헤더 */}
            <div className="h-[4rem]">
                <BackHeader title="유형연습 Q8-10 복습" hideLogButton={false} />
            </div>

            {/* 콘텐츠 */}
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

            {/* 하단 버튼 */}
            <div className="pb-6">
                <MainButton
                    onClick={() => navigate('/pomodoro')}
                    colorClass="bg-text-sub"
                >
                    {allChecked ? '스탬프 완료하기' : '학습 시작하기'}
                </MainButton>
            </div>
        </div>
    );
}

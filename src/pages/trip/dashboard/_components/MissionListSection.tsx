import PlusIcon from '../../../../assets/icons/roundedPlus.svg?react';
import MissionCard from '../_components/MissionCard';

import { type MissionItem } from '../../../../types/mission/Mission';

interface MissionListSectionProps {
    missions: MissionItem[];
    allCompleted: boolean;
    completedCount: number;
    isEditMode: boolean;

    addMission: () => void;
    onUpdateLabel: (id: number | string, value: string) => void;
    onDelete: (id: number | string) => void;
    onToggleCheck: (id: number | string) => void;
    handleToggleEdit: (id: number | string) => void;
    onToggleEditMode: () => void;
}

const MissionListSection = ({
    missions,
    allCompleted,
    completedCount,
    isEditMode,
    addMission,
    onToggleEditMode,
    onUpdateLabel,
    onDelete,
    onToggleCheck,
    handleToggleEdit,
}: MissionListSectionProps) => {
    return (
        <section className="pt-[3.25rem]">
            {/* 헤더 영역 */}
            <div className="flex items-center justify-between">
                <span className="text-body font-semibold">
                    {allCompleted && '오늘의 미션을 모두 완료했어요!'}
                    {!allCompleted
                        ? missions.length
                            ? `오늘의 미션, ${missions.length - completedCount}개 남았어요!`
                            : '오늘의 미션을 먼저 설정해 주세요!'
                        : undefined}
                </span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleEditMode}
                        className="cursor-pointer text-sm text-[#585858] underline"
                    >
                        {isEditMode ? '완료' : '편집'}
                    </button>
                    <button
                        type="button"
                        aria-label="미션 추가"
                        className="cursor-pointer"
                        onClick={addMission}
                    >
                        <PlusIcon aria-hidden="true" />
                    </button>
                </div>
            </div>
            {/* 서브 텍스트 */}
            {allCompleted && (
                <span className="text-sm text-[#585858]">
                    더 학습하고 싶다면 미션을 추가해 보세요.
                </span>
            )}

            <div className="flex h-[calc(100vh-25rem)] flex-col gap-3.5 overflow-y-auto px-0.5 py-4">
                {missions.length ? (
                    missions.map((mission, index) => (
                        <MissionCard
                            key={mission.missionId}
                            mission={mission}
                            isEditMode={isEditMode}
                            onChange={(id, value) => onUpdateLabel(id, value)}
                            onDelete={(id) => onDelete(id)}
                            onEditToggle={(id) => handleToggleEdit(id)}
                            onToggleCheck={(id) => onToggleCheck(id)}
                            index={index}
                            isEditing={mission.isEditing}
                            isChecked={mission.isChecked}
                        />
                    ))
                ) : (
                    <div className="flex h-[calc(100vh-25rem)] items-center justify-center">
                        <span className="text-body text-[#C6C5BF]">
                            + 버튼을 눌러 미션을 추가할 수 있어요
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MissionListSection;

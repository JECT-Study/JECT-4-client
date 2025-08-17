import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import PlusIcon from '../../../../assets/icons/roundedPlus.svg?react';
import MissionCard from '../_components/MissionCard';

import { type MissionItem } from '../../../../types/mission/Mission';
import useCreateMission from '../../../../hooks/mission/useCreateMission';

interface MissionListSectionProps {
    tripId: number;
    stampId: number;
    missions: MissionItem[];
    allChecked: boolean;
    checkedCount: number;
    isEditMode: boolean;
    addMission: () => void;
    onToggleEditMode: () => void;
    onUpdateLabel: (id: number | string, value: string) => void;
    onDelete: (id: number | string) => void;
    onToggleCheck: (id: number | string) => void;
    onUpdateMissionOrder: (newMissions: MissionItem[]) => void;
}

const MissionListSection = ({
    tripId,
    stampId,
    missions,
    allChecked,
    checkedCount,
    isEditMode,
    onToggleEditMode,
    onUpdateLabel,
    onDelete,
    onToggleCheck,
    onUpdateMissionOrder,
}: MissionListSectionProps) => {
    const { mutateCreateMission } = useCreateMission();

    const handleAddMission = useCallback(async () => {
        const newMissionId = uuidv4();

        const newMission: MissionItem = {
            missionId: newMissionId,
            missionName: '',
            completed: false,
            isEditing: true,
            isChecked: false,
        };

        const updatedMissions = [...missions, newMission];

        onUpdateMissionOrder(updatedMissions);
    }, [missions, onUpdateMissionOrder]);

    const handleToggleEdit = useCallback(
        (id: number | string) => {
            const updatedMissions = missions.map((mission) =>
                mission.missionId === id
                    ? { ...mission, isEditing: !mission.isEditing }
                    : mission
            );

            onUpdateMissionOrder(updatedMissions);

            const lastIndex = updatedMissions.length - 1;

            mutateCreateMission({
                tripId,
                stampId,
                missionContent: {
                    missionName: updatedMissions[lastIndex].missionName,
                },
            });
        },
        [missions, onUpdateMissionOrder]
    );

    return (
        <section className="pt-[3.25rem]">
            {/* 헤더 영역 */}
            <div className="flex items-center justify-between">
                <span className="text-body font-semibold">
                    {missions.length
                        ? `오늘의 미션, ${missions.length - checkedCount}개 남았어요!`
                        : '오늘의 미션을 먼저 설정해 주세요!'}
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
                        onClick={handleAddMission}
                    >
                        <PlusIcon aria-hidden="true" />
                    </button>
                </div>
            </div>
            {/* 서브 텍스트 */}
            {allChecked && (
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

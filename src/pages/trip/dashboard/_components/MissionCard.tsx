import React from 'react';

import XboxIcon from '../../../../assets/icons/x.svg?react';
import { type MissionItem } from '../../../../types/mission/Mission';

interface MissionCardProps {
    mission: MissionItem;
    isEditing: boolean;
    isChecked: boolean;
    onChange: (id: number | string, value: string) => void;
    onEditToggle: (id: number | string, index: number) => void;
    onDelete: (id: number | string) => void;
    onToggleCheck: (id: number | string) => void;
    isEditMode: boolean;
    index: number;
}

const MissionCard: React.FC<MissionCardProps> = ({
    index,
    mission,
    isChecked,
    isEditing,
    onChange,
    onEditToggle,
    isEditMode,
    onDelete,
    onToggleCheck,
}) => {
    return (
        <article
            className={`flex h-[4.4375rem] items-center justify-between rounded-xl ${mission.completed ? 'bg-[#F8F7F5]' : 'bg-white'} py-[1.4375rem] pr-6 pl-[1.125rem] shadow-[3px_4px_8px_0_rgba(0,0,0,0.08)]`}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={mission.missionName}
                    onChange={(e) =>
                        onChange(mission.missionId, e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onEditToggle(mission.missionId, index);
                        }
                    }}
                    onBlur={() => onEditToggle(mission.missionId, index)}
                    className="w-full text-lg font-medium placeholder-[#CDCDCD] outline-none"
                    placeholder="할 일을 입력하세요."
                    autoFocus
                />
            ) : (
                <span
                    className="text-secondary flex-grow cursor-pointer text-lg font-semibold"
                    onClick={() => onEditToggle(mission.missionId, index)}
                >
                    {mission.missionName}
                </span>
            )}
            {isEditMode ? (
                <button
                    type="button"
                    aria-label="미션 삭제"
                    className="ml-4 h-8 w-8 cursor-pointer"
                    onClick={() => onDelete(mission.missionId)}
                >
                    <XboxIcon
                        aria-hidden="true"
                        className="h-8 w-8 cursor-pointer"
                    />
                </button>
            ) : (
                <input
                    disabled={mission.completed}
                    checked={mission.completed || isChecked}
                    onChange={() => onToggleCheck(mission.missionId)}
                    type="checkbox"
                    className={`ml-4 h-5 w-5 ${mission.completed ? 'accent-[#c2c2c2]' : 'accent-text-sub'}`}
                />
            )}
        </article>
    );
};

export default MissionCard;

import XboxIcon from '../../../../assets/icons/x.svg?react';

interface MissionCardProps {
    label: string;
    isEditing: boolean;
    isEditMode: boolean;
    isChecked: boolean;
    onChange: (value: string) => void;
    onEditToggle: () => void;
    onDelete?: () => void;
    onToggleCheck: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
    label,
    isEditing,
    isChecked,
    onChange,
    onEditToggle,
    isEditMode,
    onDelete,
    onToggleCheck,
}) => {
    return (
        <article className="flex h-[4.4375rem] items-center justify-between rounded-b-xl bg-white py-[1.4375rem] pr-6 pl-[1.125rem] shadow-[3px_4px_8px_0_rgba(0,0,0,0.08)]">
            {isEditing ? (
                <input
                    type="text"
                    value={label}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onEditToggle();
                        }
                    }}
                    className="w-full text-lg font-medium placeholder-[#CDCDCD] outline-none"
                    placeholder="할 일을 입력하세요."
                    autoFocus
                />
            ) : (
                <span className="text-secondary text-lg font-semibold">
                    {label}
                </span>
            )}
            {isEditMode ? (
                <button
                    type="button"
                    aria-label="미션 삭제"
                    className="h-8 w-8 cursor-pointer"
                    onClick={onDelete}
                >
                    <XboxIcon
                        aria-hidden="true"
                        className="h-8 w-8 cursor-pointer"
                    />
                </button>
            ) : (
                <input
                    checked={isChecked}
                    onChange={onToggleCheck}
                    type="checkbox"
                    className="accent-text-sub h-5 w-5"
                />
            )}
        </article>
    );
};

export default MissionCard;

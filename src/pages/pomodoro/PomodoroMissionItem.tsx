type missionProps = {
    id: number;
    name: string;
    checked: boolean;
    onToggle: () => void;
};

const PomodoroMissionItem = ({ id, name, checked, onToggle }: missionProps) => {
    return (
        <div className="flex items-center">
            <input
                id={String(id)}
                type="checkbox"
                checked={checked}
                onChange={onToggle}
                className="accent-text-sub h-5 w-5"
            />
            <label htmlFor={String(id)} className="ml-4">
                {name}
            </label>
        </div>
    );
};

export default PomodoroMissionItem;

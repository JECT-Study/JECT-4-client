interface LogMissionItemProps {
    id: number;
    name: string;
    checked: boolean;
    onToggle: (id: number) => void;
}

const LogMissionItem = ({
    id,
    name,
    checked,
    onToggle,
}: LogMissionItemProps) => {
    return (
        <div className="flex items-center">
            <input
                id={`mission-${id}`}
                type="checkbox"
                className="accent-text-sub h-5 w-5"
                checked={checked}
                onChange={() => onToggle(id)}
            />
            <label htmlFor={`mission-${id}`} className="ml-4">
                {name}
            </label>
        </div>
    );
};

export default LogMissionItem;

interface ProgressBarProps {
    progressLength: number;
    completedLength: number;
}

const ProgressBar = ({ completedLength, progressLength }: ProgressBarProps) => {
    const progressPercent = Math.min(
        (completedLength / progressLength) * 100,
        100
    );

    return (
        <div className="relative w-2/3">
            <div className="h-4 w-full rounded-[1.25rem] bg-[#F8F7F5]" />
            <div
                className="bg-point2 text-caption absolute top-0 left-0 flex h-4 items-center justify-center rounded-[1.25rem] text-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
            >
                <span className="text-caption">
                    {completedLength}/{progressLength}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;

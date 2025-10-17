interface ProgressBarProps {
    progressLength: number;
    completedLength: number;
}

const ProgressBar = ({ completedLength, progressLength }: ProgressBarProps) => {
    const safeTotal = Math.max(0, progressLength);
    const clampedNow =
        safeTotal === 0 ? 0 : Math.min(Math.max(0, completedLength), safeTotal);

    const progressPercent =
        safeTotal === 0 ? 0 : (clampedNow / safeTotal) * 100;

    return (
        <div
            className="relative w-2/3"
            role="progressbar"
            aria-label="진행률"
            aria-valuemin={0}
            aria-valuemax={safeTotal}
            aria-valuenow={clampedNow}
        >
            <div className="h-4 w-full rounded-[1.25rem] bg-[#F8F7F5]" />
            <div
                className="bg-point2 text-caption absolute top-0 left-0 flex h-4 items-center justify-center rounded-full text-white transition-all duration-300"
                style={{ width: `${progressPercent || '1'}%` }}
            >
                <span className="text-caption">
                    {progressPercent ? `${clampedNow}/${safeTotal}` : null}
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;

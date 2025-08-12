import GoalIcon from '../../../assets/icons/goal.svg?react';
import EnableIcon from '../../../assets/icons/enabled_goal.svg?react';
import CompleteIcon from '../../../assets/icons/complete.svg?react';
import BubbleIcon from '../../../assets/icons/bubble.svg?react';
import {
    alignStyleClass,
    goalStateNumberStyleClass,
    goalStateTitleStyleClass,
} from '../_styles/styleClasses';

interface GoalStepProps {
    sequence: string;
    title: string;
    align: 'left' | 'right' | 'center';
    pathDirection?: 'normal' | 'flipped';
    pathD: string;
    svgHeight?: number;
    goalState?: 'complete' | 'goal' | 'enable';
    isLast?: boolean;
    onNavigate?: () => void;
}

const GoalStep: React.FC<GoalStepProps> = ({
    sequence,
    title,
    align,
    pathDirection = 'normal',
    pathD,
    svgHeight = 45,
    goalState = 'enable',
    isLast = false,
    onNavigate,
}) => {
    const transformValue =
        pathDirection === 'flipped'
            ? 'scale(-1,1) translate(-242,0)'
            : undefined;

    return (
        <div className="flex flex-col">
            <div className={`flex ${alignStyleClass[align]} pl-24`}>
                {align === 'right' && (
                    <div className="flex flex-col justify-center pr-4 text-right">
                        <h5
                            className={`${goalStateNumberStyleClass[goalState]} text-xl font-bold`}
                        >
                            {sequence}
                        </h5>
                        <p
                            className={`${goalStateTitleStyleClass[goalState]} text-base whitespace-pre-wrap`}
                        >
                            {title}
                        </p>
                    </div>
                )}
                {goalState === 'goal' ? (
                    <button
                        type="button"
                        className="relative cursor-pointer"
                        onClick={() => onNavigate?.()}
                        aria-label="목표로 이동"
                    >
                        <BubbleIcon className="absolute top-[-10%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform" />
                        <GoalIcon />
                    </button>
                ) : (
                    <div aria-hidden="true">
                        {goalState === 'enable' ? (
                            <EnableIcon />
                        ) : (
                            <CompleteIcon />
                        )}
                    </div>
                )}
                {align !== 'right' && (
                    <div className="flex flex-col justify-center pl-4">
                        <h5
                            className={`${goalStateNumberStyleClass[goalState]} text-xl font-bold`}
                        >
                            {sequence}
                        </h5>
                        <p
                            className={`${goalStateTitleStyleClass[goalState]} text-base whitespace-pre-wrap`}
                        >
                            {title}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex justify-center pl-[0.25rem]">
                {!isLast && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="242"
                        height={svgHeight}
                        viewBox={`0 0 242 ${svgHeight}`}
                        fill="none"
                    >
                        {transformValue ? (
                            <g transform={transformValue}>
                                <path
                                    d={pathD}
                                    stroke={
                                        goalState === 'complete'
                                            ? '#895C41'
                                            : '#D0C9BA'
                                    }
                                    strokeWidth={
                                        goalState === 'complete' ? '8' : '5'
                                    }
                                    strokeLinecap="round"
                                    strokeDasharray={
                                        goalState !== 'complete'
                                            ? '10 15'
                                            : undefined
                                    }
                                />
                            </g>
                        ) : (
                            <path
                                d={pathD}
                                stroke={
                                    goalState === 'complete'
                                        ? '#895C41'
                                        : '#D0C9BA'
                                }
                                strokeWidth={
                                    goalState === 'complete' ? '8' : '5'
                                }
                                strokeLinecap="round"
                                strokeDasharray={
                                    goalState !== 'complete'
                                        ? '10 15'
                                        : undefined
                                }
                            />
                        )}
                    </svg>
                )}
            </div>
        </div>
    );
};

export default GoalStep;

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
    goalState?: 'complete' | 'goal' | 'enable';
    isLast?: boolean;
    onNavigate?: () => void;
}

const GoalStep: React.FC<GoalStepProps> = ({
    sequence,
    title,
    align,
    pathDirection = 'normal',
    goalState = 'enable',
    isLast = false,
    onNavigate,
}) => {
    const path1 = 'M118 0V66C118 80 106 92 92 92H31C16 92 5 103 5 118V150';
    const path2 = 'M5 0V5.5C5 15 13 23 23 26L211 26C225 26 237 38 237 50V50';

    const transformValue =
        pathDirection === 'flipped'
            ? 'scale(-1,1) translate(-242,0)'
            : undefined;

    const path = () => (
        <path
            d={align === 'center' ? path1 : path2}
            stroke={goalState === 'complete' ? '#895C41' : '#D0C9BA'}
            strokeWidth={goalState === 'complete' ? '8' : '5'}
            strokeLinecap="round"
            strokeDasharray={goalState !== 'complete' ? '10 15' : undefined}
        />
    );

    const titleAlign = (titleStyle: string) => (
        <div className={`flex flex-col justify-center ${titleStyle}`}>
            <h5
                className={`${goalStateNumberStyleClass[goalState]} text-xl font-bold`}
            >
                {sequence}
            </h5>
            <p
                className={`${goalStateTitleStyleClass[goalState]} line-clamp-2 truncate text-base whitespace-pre-wrap`}
            >
                {title}
            </p>
        </div>
    );

    return (
        <div className="relative flex flex-col">
            <div className={`flex ${alignStyleClass[align]}`}>
                {align === 'right' && <>{titleAlign('pr-4 text-right')}</>}
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
                    <button disabled aria-disabled tabIndex={-1}>
                        {goalState === 'enable' ? (
                            <EnableIcon />
                        ) : (
                            <CompleteIcon />
                        )}
                    </button>
                )}
                {align !== 'right' && <>{titleAlign('pl-4')}</>}
            </div>
            <div className="flex justify-center">
                {!isLast && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="242"
                        height={align === 'center' ? 120 : 45}
                        viewBox={`0 0 242 ${align === 'center' ? 120 : 45}`}
                        fill="none"
                    >
                        {transformValue ? (
                            <g transform={transformValue}>{path()}</g>
                        ) : (
                            <> {path()}</>
                        )}
                    </svg>
                )}
            </div>
        </div>
    );
};

export default GoalStep;

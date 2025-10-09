import HistoryIcon1 from '@assets/icons/history/history1.svg?react';
import HistoryIcon2 from '@assets/icons/history/history2.svg?react';
import HistoryIcon3 from '@assets/icons/history/history3.svg?react';

export interface GoalCardProps {
    type: 'learning' | 'session' | 'studyDays';
    goal: number;
}

const GoalCard = ({ type, goal }: GoalCardProps) => {
    const Icon = {
        learning: <HistoryIcon1 />,
        session: <HistoryIcon2 />,
        studyDays: <HistoryIcon3 />,
    };

    const title = {
        learning: '총 학습 시간',
        session: '세션 성공',
        studyDays: '연속 학습일',
    };

    const unit = {
        learning: '시간',
        session: '개',
        studyDays: '일',
    };

    return (
        <article className="bg-secondary flex w-1/3 flex-col items-center gap-0.5 rounded-md p-2">
            {Icon[type]}
            <p className="text-caption text-background">{title[type]}</p>
            <p className="text-small font-bold text-white">{`${goal}${unit[type]}`}</p>
        </article>
    );
};

export default GoalCard;

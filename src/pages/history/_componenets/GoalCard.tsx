export interface GoalCardProps {
    type: 'learning' | 'session' | 'studyDays';
    goal: number;
}

const GoalCard = ({ type, goal }: GoalCardProps) => {
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
        <article className="bg-secondary flex w-1/3 flex-col items-center rounded-lg p-2 text-white">
            <p className="text-caption">{title[type]}</p>
            <p className="text-subtitle">{`${goal}${unit[type]}`}</p>
        </article>
    );
};

export default GoalCard;

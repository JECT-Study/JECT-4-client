import GoalCard, { type GoalCardProps } from '../../_componenets/GoalCard';

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

interface FirstSectionProps {
    goalCardContents: GoalCardContentsType;
}

const FirstSection = ({ goalCardContents }: FirstSectionProps) => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex justify-end">
                <p className="text-text-min text-caption">
                    2025년 6월 4일 ~ 2025년 6월 10일
                </p>
            </div>
            <div className="flex w-full gap-1.5">
                {Object.keys(goalCardContents).map((keyAsString) => {
                    const type = keyAsString as keyof GoalCardContentsType;

                    return (
                        <GoalCard
                            type={type}
                            key={type}
                            goal={goalCardContents[type]}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default FirstSection;

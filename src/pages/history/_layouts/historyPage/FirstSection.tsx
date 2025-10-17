import type { DetailTripReport } from '@/types/report';
import GoalCard, { type GoalCardProps } from '../../_componenets/GoalCard';
import { formatDate } from '@utils/date';

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

interface FirstSectionProps {
    detailReport: DetailTripReport;
    goalCardContents: GoalCardContentsType;
}

const FirstSection = ({
    goalCardContents,
    detailReport,
}: FirstSectionProps) => {
    const { startDate, endDate } = detailReport;

    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);

    return (
        <section className="flex flex-col gap-2">
            <div className="flex justify-end">
                <p className="text-text-min text-caption">
                    {formatStartDate} ~ {formatEndDate}
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

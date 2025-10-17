import type { DetailTripReport } from '@/types/report';

interface SecondSectionProps {
    content: DetailTripReport['content'];
}

const SecondSection = ({ content }: SecondSectionProps) => {
    return (
        <section>
            <div className="rounded-lg bg-[#F8F7F5] p-3">
                <p className="text-text-min text-caption whitespace-pre-line">
                    {content}
                </p>
            </div>
        </section>
    );
};

export default SecondSection;

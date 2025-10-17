import type { DetailTripReport } from '@/types/report';

interface ThirdSecitonProps {
    detailReport: DetailTripReport;
}

const ThirdSection = ({ detailReport }: ThirdSecitonProps) => {
    const { imageTitle, imageUrl } = detailReport;

    return (
        <section className="flex flex-col gap-2">
            {imageUrl ? (
                <>
                    <div>
                        <p className="text-text-sub text-caption">
                            {imageTitle}
                        </p>
                    </div>
                    <div>
                        <img
                            src={imageUrl}
                            className="w-full object-fill"
                            alt="학습 기록 이미지"
                        />
                    </div>
                </>
            ) : null}
        </section>
    );
};

export default ThirdSection;

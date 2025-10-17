import { useNavigate } from 'react-router-dom';

interface TripCardProps {
    reportId: number;
    title: string;
    time: number;
    startDate: string;
    endDate: string;
    imageUrl: string;
}

const TripCard = ({
    reportId,
    title,
    time,
    startDate,
    endDate,
    imageUrl,
}: TripCardProps) => {
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate(`/history/${reportId}`);
    };

    return (
        <article className="bg-point2 rounded-md">
            <div className="flex w-full gap-3 p-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        className="h-[4.375rem] w-[5.25rem] rounded-md object-fill"
                    />
                ) : null}
                <div className="flex flex-grow items-center justify-between">
                    <div className="flex h-full w-2/3 flex-col justify-between">
                        <div>
                            <h4 className="text-text-sub text-small font-semibold">
                                {title}
                            </h4>
                            <p className="text-text-sub text-caption">
                                {time}시간 공부
                            </p>
                        </div>
                        <p className="text-text-sub text-caption whitespace-break-spaces">
                            {startDate.split('-').join('.')}
                            {' ~ '}
                            {endDate.split('-').join('.')}
                        </p>
                    </div>
                    <button
                        className="cursor-pointer text-white"
                        onClick={handleClickButton}
                    >
                        <p className="text-caption">여행기 보기</p>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default TripCard;

import { useNavigate } from 'react-router-dom';

interface TripCardProps {
    title: string;
    time: number;
    date: string;
    imageUrl: string;
}

const TripCard = ({ title, time, date, imageUrl }: TripCardProps) => {
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate('/history/1');
    };

    return (
        <article className="bg-point2 rounded-md">
            <div className="flex w-full gap-3 p-4">
                <img
                    src={imageUrl}
                    className="h-[4.375rem] w-[5.25rem] rounded-md object-fill"
                />
                <div className="flex flex-grow items-center justify-between">
                    <div className="flex h-full flex-col justify-between">
                        <div>
                            <h4 className="text-text-sub text-small font-semibold">
                                {title}
                            </h4>
                            <p className="text-text-sub text-caption">
                                {time}시간 공부
                            </p>
                        </div>
                        <p className="text-text-sub text-caption whitespace-break-spaces">
                            {date}
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

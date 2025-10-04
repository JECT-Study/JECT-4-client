interface LogCardProps {
    type: 'trip' | 'study' | 'longTrip';
    count: number;
}

const LogCard = ({ type, count }: LogCardProps) => {
    const title = {
        trip: '완주한 여행',
        study: '누적 공부 시간',
        longTrip: '가장 긴 여행',
    };

    return (
        <article className="custom-orange-light flex w-1/3 flex-col items-center rounded-md bg-gradient-to-b from-[#F8BE66] to-[#FD9230]/80 px-4 py-4 shadow-[0_12px_15px_2px_rgba(255,178,102,0.35)]">
            <p className="text-text-sub text-caption">{title[type]}</p>
            <p className="text-subtitle text-white">{`${count}${type === 'trip' ? '개' : '시간'}`}</p>
        </article>
    );
};

export default LogCard;

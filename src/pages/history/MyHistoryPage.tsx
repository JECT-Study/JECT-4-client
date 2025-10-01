import { tripCardContents } from '../../mocks/history';
import LogCard from './_componenets/LogCard';
import TripCard from './_componenets/TripCard';

const MyHistoryPage = () => {
    return (
        <div className="flex flex-col gap-10">
            <section className="pt-16">
                <h1 className="text-title text-secondary">나의 여행 기록</h1>
                <p className="text-small text-text-min">
                    소희 님의 여정이 담긴 한 권의 성장 기록을 확인해요.
                </p>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-text-min text-caption">지나온 여정들</p>
                <div className="flex gap-3">
                    <LogCard type="trip" count={2} />
                    <LogCard type="study" count={92} />
                    <LogCard type="longTrip" count={56} />
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-text-min text-caption">완료한 여행</p>
                <div className="flex h-[calc(100vh-28rem)] flex-col gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {tripCardContents.map((trip, index) => (
                        <TripCard
                            key={`${trip.title}-${index}`}
                            title={trip.title}
                            time={trip.time}
                            date={trip.date}
                            imageUrl={trip.imageUrl}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MyHistoryPage;

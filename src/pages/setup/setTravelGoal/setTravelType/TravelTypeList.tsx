import TravelTypeCard from './TravelTypeCard';

export default function TravelTypeList() {

    const travelTypes = [
        {
            name: 'course',
            title: '코스형',
            color: 'text-point2',
            description: '계획된 순서와 단계에 따라 진행하는 목표입니다.',
            recommend: '자격증 취득이나 시험 준비를 하고 계신 분들에게 추천해요',
        },
        {
            name: 'explore',
            title: '탐험형',
            color: 'text-point1',
            description: '정해진 경로 없이 자유롭게 나아가는 목표입니다.',
            recommend: '다양한 문제를 시도하시는 분들에게 추천해요',
        },
    ] as const

    return (
        <main className="mt-[46px] flex cursor-pointer flex-col gap-4">
            {travelTypes.map((travel) => (
                <TravelTypeCard
                    key={travel.name}
                    name={travel.name}
                    title={travel.title}
                    description={travel.description}
                    recommend={travel.recommend}
                />
            ))}
        </main>
    );
}

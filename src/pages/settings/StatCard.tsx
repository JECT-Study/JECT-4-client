interface Stat {
    label: string;
    count: number;
}

interface StatCardProps {
    stats: Stat[];
}

const StatCard = ({ stats }: StatCardProps) => {
    return (
        <div className="bg-background relative z-20 -mt-10 mb-8 flex justify-evenly rounded-2xl py-3 shadow-xl">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center justify-between"
                >
                    <div className="text-secondary text-body">{item.label}</div>
                    <div className="text-title text-primary">{item.count}</div>
                </div>
            ))}
        </div>
    );
};

export default StatCard;

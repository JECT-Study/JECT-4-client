import { useNavigate } from 'react-router';

type TravelTypeCardProps = {
    name: 'linear' | 'nonLinear';
    title: string;
    description: string;
    recommend: string;
};

const TravelTypeCard = ({
    name,
    title,
    description,
    recommend,
}: TravelTypeCardProps) => {
    const colorMap = {
        linear: 'text-point2',
        nonLinear: 'text-point1',
    };

    const titleColor = colorMap[name] || 'text-point2';
    const navigate = useNavigate();

    const handleCardClicked = (selectedName: 'linear' | 'nonLinear') => {
        console.log('selectedName', selectedName); // course, explore

        const paths = {
            linear: '/create-travel-linear',
            nonLinear: '/create-travel-non-linear',
        };

        navigate(paths[selectedName]);
    };

    return (
        <section
            className="rounded-xl bg-white px-[39px] py-7.5 shadow-md"
            onClick={() => handleCardClicked(name)}
        >
            <h3 className={`${titleColor} text-display`}>{title}</h3>
            <p className="relative flex flex-col gap-3">
                <span className="text-text-min text-[14px]">{description}</span>
                <hr className="border-primary absolute top-1/2 right-0 left-0 border-0 border-t-[0.3px] border-solid" />
                <span className="text-text-min text-[12px]">{recommend}</span>
            </p>
        </section>
    );
};

export default TravelTypeCard;

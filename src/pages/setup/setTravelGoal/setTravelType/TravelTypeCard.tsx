import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

type TravelTypeCardProps = {
    name: 'course' | 'explore';
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
        course: 'text-point2',
        explore: 'text-point1',
    };

    const titleColor = colorMap[name] || 'text-point2';
    const navigate = useNavigate();

    const handleCardClicked = (selectedName: 'course' | 'explore') => {
        const paths = {
            course: `/set-travel-name?type=${selectedName}`,
            explore: `/set-travel-name?type=${selectedName}`,
        };

        if (selectedName === 'explore') {
            toast('아직 준비 중인 기능입니다.', {
                closeButton: false,
                autoClose: 1000,
                hideProgressBar: true,
                position: 'top-center',
            });

            return;
        }

        navigate(paths.course);
    };

    return (
        <section
            className="rounded-xl bg-white px-[39px] py-7.5 shadow-md"
            onClick={() => handleCardClicked(name)}
        >
            <h3 className={`${titleColor} text-display`}>{title}</h3>
            <span className="relative flex flex-col gap-3">
                <p className="text-text-min text-[14px]">{description}</p>
                <hr className="border-primary absolute top-1/2 right-0 left-0 border-0 border-t-[0.3px] border-solid" />
                <p className="text-text-min text-[12px]">{recommend}</p>
            </span>
            <ToastContainer />
        </section>
    );
};

export default TravelTypeCard;

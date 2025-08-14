import { useNavigate } from 'react-router-dom';
import BackHeader from '../../components/common/BackHeaderLayout';
import GoalStep from './_components/GoalStep';

const TripPage = () => {
    const navigate = useNavigate();

    const mockSteps = [
        {
            sequence: '01',
            title: '문제 유형 파악',
            align: 'center',
            goalState: 'complete',
        },
        {
            sequence: '02',
            title: '문제 유형 파악',
            align: 'left',
            goalState: 'complete',
        },
        {
            sequence: '03',
            title: `유형 연습\nQ8-10 복습`,
            align: 'right',
            pathDirection: 'flipped',
            goalState: 'goal',
            onNavigate: () => navigate('/trip/dashboard'),
        },
        {
            sequence: '04',
            title: '문제 유형 파악',
            align: 'left',
        },
        {
            sequence: '05',
            title: '문제 유형 파악',
            align: 'right',
            pathDirection: 'flipped',
        },
        {
            sequence: '06',
            title: '문제 유형 파악',
            align: 'left',
            isLast: true,
        },
    ] as const;

    return (
        <div className="flex flex-col">
            {/* 상단 헤더 */}
            <div className="h-[4rem]">
                <BackHeader title="토익 뿌시기" hideLogButton={false} />
            </div>
            <div className="h-[calc(100vh-10rem)] overflow-y-auto pt-6 [&::-webkit-scrollbar]:hidden">
                {mockSteps.map((step) => (
                    <GoalStep key={step.sequence} {...step} />
                ))}
            </div>
        </div>
    );
};

export default TripPage;

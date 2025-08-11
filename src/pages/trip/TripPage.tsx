import { useNavigate } from 'react-router-dom';
import BackHeader from '../../components/common/BackHeaderLayout';
import GoalStep from './_components/GoalStep';

const TripPage = () => {
    const navigate = useNavigate();

    const path1 = 'M118 0V66C118 80 106 92 92 92H31C16 92 5 103 5 118V150';
    const path2 = 'M5 0V5.5C5 15 13 23 23 26L211 26C225 26 237 38 237 50V50';

    const steps = [
        {
            sequence: '01',
            title: '문제 유형 파악',
            align: 'center',
            pathD: path1,
            svgHeight: 120,
            goalState: 'complete',
        },
        {
            sequence: '02',
            title: '문제 유형 파악',
            align: 'left',
            pathD: path2,
            goalState: 'complete',
        },
        {
            sequence: '03',
            title: `유형 연습\nQ8-10 복습`,
            align: 'right',
            pathDirection: 'flipped',
            pathD: path2,
            goalState: 'goal',
            onNavigate: () => navigate('/trip/dashboard'),
        },
        {
            sequence: '04',
            title: '문제 유형 파악',
            align: 'left',
            pathD: path2,
        },
        {
            sequence: '05',
            title: '문제 유형 파악',
            align: 'right',
            pathDirection: 'flipped',
            pathD: path2,
        },
        {
            sequence: '06',
            title: '문제 유형 파악',
            align: 'left',
            pathD: path2,
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
                {steps.map((step) => (
                    <GoalStep key={step.sequence} {...step} />
                ))}
            </div>
        </div>
    );
};

export default TripPage;

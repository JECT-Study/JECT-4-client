import LineConnector from './LineConnector';

import EllipseIcon from '../../../../../assets/icons/ellipse_brown.svg?react';
import CheckIcon from '../../../../../assets/icons/check_orange.svg?react';

interface SessionGraphProps {
    isCompleted: boolean;
    isLast: boolean;
}

/**
 * <세션 그래프 UI 컴포넌트>
 * 미션 완료 여부에 따라 체크 아이콘 및 선 스타일이 변경됩니다.
 *
 * @param isCompleted - 미션 카드 완료 여부
 * @param isLast - 마지막 미션 판단
 * @returns SessionGraph component JSX
 */
const SessionGraph: React.FC<SessionGraphProps> = ({ isCompleted, isLast }) => {
    const completeMission = () => (
        <>
            <CheckIcon className="mt-[-0.125rem] h-7 w-7" />
            {!isLast && <LineConnector color="#fff" length={43} />}
        </>
    );

    const incompleteMission = () => (
        <>
            {!isLast ? (
                <LineConnector isDashed color="#D0C9BA" length={70}>
                    <EllipseIcon />
                </LineConnector>
            ) : (
                <EllipseIcon />
            )}
        </>
    );

    return (
        <div className="flex">
            {isCompleted ? completeMission() : incompleteMission()}
        </div>
    );
};

export default SessionGraph;

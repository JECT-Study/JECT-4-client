import { useNavigate } from 'react-router-dom';

import LeftArrow from '../../assets/icons/left_arrow.svg?react';
import LogIcon from '../../assets/icons/log.svg?react';
import EditIcon from '../../assets/icons/edit.svg?react';
import useValidatedTripId from '../../hooks/common/useValidateTripId';

interface BackHeaderProps {
    title?: string;
    onBack?: () => void; // 뒤로가기 동작 커스터마이징 가능
    hideBackButton?: boolean; // 뒤로가기 버튼 보일지 결정
    hideEditButton?: boolean; // 스탬프 수정 버튼 보일지 결정
    hideLogButton?: boolean; // 공부 기록 버튼 보일지 결정 (trip-dashboard)
}

const BackHeader = ({
    title,
    onBack,
    hideBackButton = false,
    hideEditButton = false,
    hideLogButton = true,
}: BackHeaderProps) => {
    const navigate = useNavigate();
    const tripId = useValidatedTripId();

    if (!tripId) return null;

    const handleBack = () => {
        if (onBack) onBack();
        else navigate(-1); // 기본 뒤로가기
    };

    const handleNavigate = () => {
        navigate(`/trip/${tripId}/setting`);
    };

    return (
        <div className="absolute inset-x-0 flex w-full items-center px-4 py-6">
            {hideBackButton ? (
                <div className="h-4 w-4" /> // 왼쪽 공간 맞추기용
            ) : (
                <button onClick={handleBack}>
                    <LeftArrow className="h-4 w-4" />
                </button>
            )}
            <div className="text-text-sub text-subtitle line-clamp-1 flex-1 text-center font-semibold">
                {title}
            </div>
            {hideLogButton ? (
                <div className="h-4 w-4" /> // 오른쪽 공간 맞추기용
            ) : (
                <div className="flex items-center gap-3">
                    {hideEditButton ? null : (
                        <button onClick={handleNavigate}>
                            <EditIcon className="fill-text-sub cursor-pointer" />
                        </button>
                    )}
                    <button onClick={() => navigate(`/log/${tripId}`)}>
                        <LogIcon className="h-4 w-4 cursor-pointer" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BackHeader;

import LeftArrow from '../../assets/icons/left_arrow.svg?react';
import { useNavigate } from 'react-router';

interface BackHeaderProps {
    title: string;
    onBack?: () => void; // 뒤로가기 동작 커스터마이징 가능
}

const BackHeader = ({ title, onBack }: BackHeaderProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1); // 기본 뒤로가기
        }
    };

    return (
        <div className="absolute inset-x-0 flex w-full items-center px-4 py-3">
            <button onClick={handleBack}>
                <LeftArrow className="h-4 w-4" />
            </button>
            <div className="text-text-sub text-subtitle flex-1 text-center font-semibold">
                {title}
            </div>
            <div className="h-4 w-4" /> {/* 오른쪽 공간 맞추기용 */}
        </div>
    );
};

export default BackHeader;

import React from 'react';

interface MainButtonProps {
    colorClass?: string; // 버튼 색상 클래스
    children?: React.ReactNode; // 버튼 내부에 표시할 내용
    onClick: () => void;
    disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({
    disabled,
    onClick,
    colorClass = 'bg-primary',
    children = '다음',
}) => {
    return (
        <button
            disabled={disabled}
            className={`h-12 w-full rounded-lg text-white transition ${disabled ? 'bg-dim-variant cursor-not-allowed' : `${colorClass} cursor-pointer hover:brightness-90`}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default MainButton;

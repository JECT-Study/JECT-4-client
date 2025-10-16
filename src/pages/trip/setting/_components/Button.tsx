import CheckIcon from '../../../../assets/icons/button_check.svg?react';

interface ButtonProps {
    isCompleted: boolean;
    onClick?: () => void;
    disabled?: boolean;
    cursor?: string;
}

const Button = ({ isCompleted, onClick, disabled, cursor }: ButtonProps) => {
    const ButtonStyles = {
        false: 'bg-[#EEE7D8]',
        true: 'bg-[#F8F7F5] border-text-sub border-1',
    };

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`flex h-[1.875rem] w-[4.375rem] ${cursor} items-center justify-center gap-1.5 rounded-md ${ButtonStyles[`${isCompleted}`]} px-3 py-1`}
        >
            <span className="text-text-sub text-caption">완료</span>
            {isCompleted && <CheckIcon className="fill-text-sub" />}
        </button>
    );
};

export default Button;

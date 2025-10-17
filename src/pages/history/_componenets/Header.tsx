import { useNavigate } from 'react-router-dom';
import CloseButton from '../../../assets/icons/x.svg?react';

const Header = ({ text }: { text: string }) => {
    const navigate = useNavigate();

    const handleCloseClick = () => {
        navigate('/history');
    };

    return (
        <header className="absolute inset-x-0 flex w-full items-center justify-end bg-[#fffcf4] px-3 py-6">
            <p className="text-text-sub text-subtitle flex w-9/10 justify-center font-semibold">
                {text}
            </p>
            <CloseButton onClick={handleCloseClick} />
        </header>
    );
};

export default Header;

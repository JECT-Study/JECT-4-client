import { useNavigate } from 'react-router-dom';
import CloseButton from '../../../assets/icons/x.svg?react';

const Header = ({ text }: { text: string }) => {
    const navigate = useNavigate();

    const handleCloseClick = () => {
        navigate(-1);
    };

    return (
        <header className="flex w-full items-center py-6">
            <p className="text-text-sub text-subtitle flex w-9/10 justify-center font-semibold">
                {text}
            </p>
            <CloseButton onClick={handleCloseClick} />
        </header>
    );
};

export default Header;

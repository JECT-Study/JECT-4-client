import CloseButton from '../../../assets/icons/x.svg?react';

const Header = ({ text }: { text: string }) => {
    return (
        <header className="flex w-full items-center py-6">
            <p className="text-text-sub text-subtitle flex w-9/10 justify-center font-semibold">
                {text}
            </p>
            <CloseButton />
        </header>
    );
};

export default Header;

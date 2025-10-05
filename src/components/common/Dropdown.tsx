import { useState } from 'react';
import RightArrowIcon from '@assets/icons/right_arrow.svg?react';

interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
}

export default function Dropdown({ options, onSelect }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>('최신순');

    const handleSelect = (option: string) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text-sub flex items-center justify-center gap-1 text-sm"
            >
                {selected} <RightArrowIcon className="h-2 w-2 rotate-90" />
            </button>

            {isOpen && (
                <ul className="absolute left-0 z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-md">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="cursor-pointer px-3 py-1 text-sm hover:bg-gray-100"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

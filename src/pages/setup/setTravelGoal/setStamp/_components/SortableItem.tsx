import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import MenuIcon from '@assets/icons/menu.svg?react';
import DeleteIcon from '@assets/icons/delete.svg?react';

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

interface SortableItemProps {
    item: Item;
    onChange: (id: string, value: string) => void;
    onEnter: (id: string, currentIndex: number) => void;
    onDelete: (id: string) => void;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    index: number;
}

const SortableItem: React.FC<SortableItemProps> = ({
    item,
    onChange,
    onEnter,
    onDelete,
    inputRefs,
    index,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="text-text-sub mb-4 flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
        >
            <div {...listeners} className="cursor-grab touch-none select-none">
                <MenuIcon />
            </div>
            {item.isEditing ? (
                <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    autoFocus
                    tabIndex={-1}
                    value={item.text}
                    onChange={(e) => onChange(item.id, e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && onEnter(item.id, index)
                    }
                    onBlur={() => onEnter(item.id, index)}
                    maxLength={30}
                    placeholder="목표를 입력해 주세요"
                    className="text-subtitle w-full flex-1"
                />
            ) : (
                <div
                    onClick={() => onEnter(item.id, index)}
                    className="text-subtitle min-h-6 flex-1 cursor-text select-text"
                >
                    {item.text ?? ''}
                </div>
            )}
            {!item.isEditing && (
                <button onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                </button>
            )}
        </div>
    );
};

export default SortableItem;

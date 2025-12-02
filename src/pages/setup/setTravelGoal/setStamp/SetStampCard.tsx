import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import PlusIcon from '@assets/icons/plus.svg?react';

const SortableItem = lazy(() => import('./_components/SortableItem'));
const DraggableList = lazy(() => import('./_components/DraggableList'));

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

interface SetStampCardProps {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const SetStampCard: React.FC<SetStampCardProps> = ({ items, setItems }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (items.length === 0) handleAddItem();
    }, []);

    const handleAddItem = () => {
        if (items.length >= 30) {
            toast('최대 30개까지 입력할 수 있습니다.', {
                closeButton: false,
                autoClose: 1000,
                hideProgressBar: true,
                position: 'top-center',
            });
            return;
        }
        const newItem: Item = {
            id: uuidv4(),
            text: '',
            isEditing: true,
        };
        setItems((prev) => [...prev, newItem]);
        setTimeout(() => {
            const lastIndex = items.length;
            inputRefs.current[lastIndex]?.focus({ preventScroll: true });
        }, 0);
    };

    const handleChange = (id: string, text: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, text } : item))
        );
    };

    const handleToggleEdit = (id: string) => {
        setItems((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, isEditing: !item.isEditing } : item
            );
            const target = prev.find((item) => item.id === id);
            if (target && target.isEditing && target.text.trim() === '') {
                return prev.filter((item) => item.id !== id);
            }
            return updated;
        });
    };

    const handleDelete = (id: string) =>
        setItems((prev) => prev.filter((item) => item.id !== id));

    return (
        <div>
            <div className="max-h-96 overflow-x-hidden overflow-y-auto">
                <Suspense fallback={<div>순서 편집 UI 로딩 중...</div>}>
                    <DraggableList
                        items={items}
                        setItems={setItems}
                        inputRefs={inputRefs}
                    >
                        {items.map((item, index) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                onChange={handleChange}
                                onEnter={handleToggleEdit}
                                onDelete={handleDelete}
                                inputRefs={inputRefs}
                                index={index}
                            />
                        ))}
                    </DraggableList>
                </Suspense>
            </div>
            <button
                onClick={handleAddItem}
                className="text-secondary mt-4 flex w-full items-center justify-center rounded-xl bg-black/5 px-4 py-8 transition-colors"
            >
                <PlusIcon />
            </button>
        </div>
    );
};

export default SetStampCard;

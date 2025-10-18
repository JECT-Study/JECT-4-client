import { useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MenuIcon from '../../../../assets/icons/menu.svg?react';
import DeleteIcon from '../../../../assets/icons/delete.svg?react';
import PlusIcon from '../../../../assets/icons/plus.svg?react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

interface SetStampCardProps {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function SortableItem({
    item,
    onChange,
    onEnter,
    onDelete,
    inputRefs,
    index,
}: {
    item: Item;
    onChange: (id: string, value: string) => void;
    onEnter: (id: string, currentIndex: number) => void;
    onDelete: (id: string) => void;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    index: number;
}) {
    // 드래그와 정렬을 위한 훅 사용
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    // transform, transition 을 style로 적용해 부드러운 애니메이션 효과 부여
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            // flex 레이아웃, 간격, 패딩, 테두리 등 Tailwind 클래스 적용
            className="text-text-sub mb-4 flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
        >
            {/* 드래그 핸들 아이콘, 터치/드래그 감지 위해 listeners 연결 */}
            <div {...listeners} className="cursor-grab touch-none select-none">
                <MenuIcon />
            </div>

            {/* isEditing 상태에 따라 input 또는 div 렌더링 */}
            {item.isEditing ? (
                <div className="text-subtitle flex-1 focus:outline-none">
                    <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        autoFocus
                        tabIndex={-1}
                        value={item.text}
                        onChange={(e) => onChange(item.id, e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onEnter(item.id, index);
                        }}
                        onBlur={() => onEnter(item.id, index)}
                        maxLength={30}
                        placeholder="필수 이론 정리"
                        className="w-full"
                    />
                </div>
            ) : (
                <div
                    onClick={() => onEnter(item.id, index)}
                    // 클릭 시 input으로 변경, flex-grow로 너비 채움
                    className="text-subtitle min-h-6 flex-1 cursor-text select-text"
                >
                    {item.text ?? ''}
                </div>
            )}
            {item.isEditing ? (
                <></>
            ) : (
                <button onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                </button>
            )}
        </div>
    );
}

const SetStampCard = ({ items, setItems }: SetStampCardProps) => {
    // input DOM ref 배열 관리
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // PointerSensor에 activationConstraint 추가하여 모바일 드래그 민감도 조절
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );

    // 새로운 아이템 추가 함수
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

    // 텍스트 변경 시 상태 업데이트
    const handleChange = (id: string, text: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, text } : item))
        );
    };

    // 엔터 입력 혹은 div 클릭 시 편집 모드 토글
    const handleToggleEdit = (id: string) => {
        setItems((prev) => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, isEditing: !item.isEditing } : item
            );

            // 방금 편집이 끝난 아이템 확인
            const target = prev.find((item) => item.id === id);
            if (target && target.isEditing && target.text.trim() === '') {
                // 편집 중이던 항목이 비어 있으면 삭제
                return prev.filter((item) => item.id !== id);
            }

            return updated;
        });
    };
    // 삭제
    const handleDelete = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 드래그가 끝난 후 아이템 순서 변경 처리
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        setItems((prev) => arrayMove(prev, oldIndex, newIndex));

        // 드래그 시 inputRefs도 같이 순서 재배열
        inputRefs.current = arrayMove(inputRefs.current, oldIndex, newIndex);
    };

    useEffect(() => {
        if (items.length === 0) handleAddItem();
    }, []);

    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <div>
            <div className="max-h-96 overflow-x-hidden overflow-y-auto">
                {/* 드래그 컨텍스트 */}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    {/* 정렬 가능한 리스트 컨텍스트 */}
                    <SortableContext
                        items={items.map((item) => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {/* 각각의 아이템 렌더링 */}
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
                    </SortableContext>
                </DndContext>
            </div>

            {/* 추가 버튼 */}
            <button
                onClick={handleAddItem}
                className="text-secondary mt-4 flex w-full items-center justify-center rounded-xl bg-black/5 px-4 py-8 transition-colors"
            >
                <PlusIcon />
            </button>
            <ToastContainer />
        </div>
    );
};

export default SetStampCard;

import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';

import React from 'react';

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

interface DraggableListProps {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    children: React.ReactNode;
}

const DraggableList: React.FC<DraggableListProps> = ({
    items,
    setItems,
    inputRefs,
    children,
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 150, tolerance: 5 },
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        setItems((prev) => arrayMove(prev, oldIndex, newIndex));
        inputRefs.current = arrayMove(inputRefs.current, oldIndex, newIndex);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
};

export default DraggableList;

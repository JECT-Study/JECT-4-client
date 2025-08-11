import { useState } from 'react';

export interface Mission {
    id: number;
    label: string;
    isEditing: boolean;
    isChecked: boolean;
}

export function useDashboardMissions(initialMissions: Mission[]) {
    const [missions, setMissions] = useState<Mission[]>(initialMissions);

    const allChecked =
        missions.length > 0 && missions.every((m) => m.isChecked);
    const checkedCount = missions.filter((m) => m.isChecked).length;

    const toggleEdit = (id: number) => {
        setMissions((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, isEditing: !m.isEditing } : m
            )
        );
    };

    const toggleCheck = (id: number) => {
        setMissions((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, isChecked: !m.isChecked } : m
            )
        );
    };

    const updateLabel = (id: number, newLabel: string) => {
        setMissions((prev) =>
            prev.map((m) => (m.id === id ? { ...m, label: newLabel } : m))
        );
    };

    const deleteMission = (id: number) => {
        setMissions((prev) => prev.filter((m) => m.id !== id));
    };

    const addMission = () => {
        setMissions((prev) => [
            ...prev,
            { id: Date.now(), label: '', isEditing: true, isChecked: false },
        ]);
    };

    return {
        missions,
        allChecked,
        checkedCount,
        toggleEdit,
        toggleCheck,
        updateLabel,
        deleteMission,
        addMission,
        setMissions,
    };
}

import { useAtom } from 'jotai';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { missionsAtom } from '../../../../store/mission';
import { type MissionItem } from '../../../../types/mission/Mission';
import useDeleteMission from '../../../../hooks/mission/useDeleteMission';
import usePatchMission from '../../../../hooks/mission/usePatchMission';
import useCreateMission from '../../../../hooks/mission/useCreateMission';

export const useDashboardMissions = (
    tripId: number,
    stampId: number,
    initialFetchedMissions?:
        | Omit<MissionItem, 'isEditing' | 'isChecked'>[]
        | undefined
) => {
    const [missions, setMissions] = useAtom(missionsAtom);
    const [debouncedUpdate, setDebouncedUpdate] = useState<{
        id: number | string;
        value: string;
    } | null>(null);

    const { mutateDeleteMission } = useDeleteMission();
    const { mutatePatchMission } = usePatchMission();
    const { mutateCreateMission } = useCreateMission();

    useEffect(() => {
        if (initialFetchedMissions) {
            const convertedMissions: MissionItem[] = initialFetchedMissions.map(
                (m) => ({
                    missionId: m.missionId,
                    missionName: m.missionName,
                    completed: m.completed,
                    isEditing: false,
                    isChecked: false,
                })
            );
            setMissions(convertedMissions);
        }
    }, [initialFetchedMissions, setMissions]);

    useEffect(() => {
        if (!debouncedUpdate) return;

        const handler = setTimeout(() => {
            const { id, value } = debouncedUpdate;

            if (typeof id === 'number') {
                mutatePatchMission({
                    tripId,
                    stampId,
                    missionId: id,
                    missionContent: { missionName: value },
                });
            }

            setDebouncedUpdate(null);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedUpdate, tripId, stampId, mutatePatchMission]);

    const addMission = useCallback(() => {
        const newMission: MissionItem = {
            missionId: uuidv4(),
            missionName: '',
            completed: false,
            isEditing: true,
            isChecked: false,
        };

        setMissions((prev) => [...prev, newMission]);
    }, [setMissions]);

    const handleToggleEdit = useCallback(
        (id: number | string) => {
            const editMission = missions.find(
                (mission) => mission.missionId === id
            );

            if (!editMission) return;

            setMissions((prev) =>
                prev.map((mission) =>
                    mission.missionId === id
                        ? { ...mission, isEditing: !mission.isEditing }
                        : mission
                )
            );

            if (editMission.isEditing) {
                const isNewMission = typeof id === 'string';

                if (isNewMission) {
                    mutateCreateMission({
                        tripId,
                        stampId,
                        missionContent: {
                            missionName: editMission.missionName,
                        },
                    });
                }
            }
        },
        [
            missions,
            setMissions,
            mutateCreateMission,
            mutatePatchMission,
            tripId,
            stampId,
        ]
    );

    const updateLabel = useCallback(
        (id: number | string, value: string) => {
            setMissions((prev) =>
                prev.map((mission) =>
                    mission.missionId === id
                        ? { ...mission, missionName: value }
                        : mission
                )
            );

            setDebouncedUpdate({ id, value });
        },
        [setMissions]
    );

    const deleteMission = useCallback(
        (id: number | string) => {
            if (typeof id === 'number') {
                mutateDeleteMission({ tripId, stampId, missionId: id });
            }

            setMissions((prev) =>
                prev.filter((mission) => mission.missionId !== id)
            );
        },
        [tripId, stampId, mutateDeleteMission, setMissions]
    );

    const toggleCheck = useCallback(
        (id: number | string) => {
            setMissions((prev) =>
                prev.map((mission) => {
                    if (mission.missionId === id && !mission.completed) {
                        return { ...mission, isChecked: !mission.isChecked };
                    }
                    return mission;
                })
            );
        },
        [setMissions]
    );

    const updateMissionOrder = useCallback(
        (newMissions: MissionItem[]) => {
            setMissions(newMissions);
        },
        [setMissions]
    );

    const allChecked = useMemo(
        () => missions.every((mission) => mission.completed),
        [missions]
    );

    const checkedMissionIds = useMemo(
        () =>
            missions
                .filter((mission) => mission.isChecked && !mission.completed)
                .map((mission) => mission.missionId),
        [missions]
    );

    const checkedCount = useMemo(
        () => missions.filter((mission) => mission.completed).length,
        [missions]
    );

    return {
        missions,
        allChecked,
        checkedCount,
        checkedMissionIds,
        addMission,
        updateLabel,
        deleteMission,
        toggleCheck,
        updateMissionOrder,
        handleToggleEdit,
    };
};

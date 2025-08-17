import { useAtom } from 'jotai';
import { useState, useMemo, useCallback, useEffect } from 'react';

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
    }, [initialFetchedMissions]);

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

    // 모든 미션이 완료되었는지 확인
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

    // 완료된 미션 개수 계산
    const checkedCount = useMemo(
        () => missions.filter((mission) => mission.completed).length,
        [missions]
    );

    // 미션 내용 업데이트
    const updateLabel = useCallback((id: number | string, value: string) => {
        setMissions((prev) =>
            prev.map((mission) =>
                mission.missionId === id
                    ? { ...mission, missionName: value }
                    : mission
            )
        );

        setDebouncedUpdate({ id, value });
    }, []);

    // 미션 삭제
    const deleteMission = useCallback(
        (id: number | string) => {
            if (typeof id === 'number') {
                mutateDeleteMission({ tripId, stampId, missionId: id });
            }

            setMissions((prev) =>
                prev.filter((mission) => mission.missionId !== id)
            );
        },
        [tripId, stampId, mutateDeleteMission]
    );

    // 미션 체크 상태 토글
    const toggleCheck = useCallback((id: number | string) => {
        setMissions((prev) =>
            prev.map((mission) => {
                if (mission.missionId === id && !mission.completed) {
                    return { ...mission, isChecked: !mission.isChecked };
                }

                return mission;
            })
        );
    }, []);

    // 전체 미션 배열 업데이트
    const updateMissionOrder = useCallback(
        (newMissions: MissionItem[]) => {
            setMissions(newMissions);
        },
        [tripId, stampId]
    );

    // 미션 추가 API 호출
    const addMission = useCallback(() => {
        mutateCreateMission({
            tripId,
            stampId,
            missionContent: { missionName: '' },
        });
    }, [mutateCreateMission, tripId, stampId]);

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
    };
};

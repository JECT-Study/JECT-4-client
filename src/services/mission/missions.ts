import api from '../../lib/axios';
import type {
    MissionContent,
    ServerMissionItem,
} from '../../types/mission/Mission';

export const createMissions = async (
    tripId: number,
    stampId: number,
    missionContent: MissionContent
) => {
    try {
        const { data } = await api.post(
            `/trips/${tripId}/stamps/${stampId}/missions`,
            missionContent
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response.status === 404) {
            throw new Error('미션을 생성할 수 없습니다.');
        }

        throw new Error(
            '미션 생성에 실패했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const fetchMissions = async (
    tripId: number,
    stampId: number
): Promise<ServerMissionItem[]> => {
    try {
        const { data } = await api.get<{
            data: ServerMissionItem[];
        }>(`/trips/${tripId}/stamps/${stampId}/missions`);

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response.status === 404) {
            throw new Error('미션 목록을 불러올 수 없습니다.');
        }

        throw new Error(
            '미션 목록을 불러오지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const deleteMission = async (
    tripId: number,
    stampId: number,
    missionId: number
) => {
    try {
        const { data } = await api.delete(
            `/trips/${tripId}/stamps/${stampId}/missions/${missionId}`
        );

        return data;
    } catch (error: unknown) {
        if ((error as any)?.response.status === 404) {
            throw new Error('미션을 삭제할 수 없습니다.');
        }

        throw new Error(
            '미션을 삭제하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

export const patchMission = async (
    tripId: number,
    stampId: number,
    missionId: number,
    missionContent: MissionContent
) => {
    try {
        const { data } = await api.patch(
            `/trips/${tripId}/stamps/${stampId}/missions/${missionId}`,
            missionContent
        );

        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response.status === 404) {
            throw new Error('미션을 수정할 수 없습니다.');
        }

        throw new Error(
            '미션을 수정하지 못했습니다. 잠시 후에 다시 시도해 주세요.'
        );
    }
};

import api from '../../lib/axios';

export interface dailyMission {
    studyLogDailyMissionId: number;
    missionName: string;
}

export interface studyLog {
    studyLogId: number;
    title: string;
    createdAt: string;
    content: string;
    imageUrl: string | null;
    dailyMissions: dailyMission[];
}

export interface History {
    hasNext: boolean;
    studyLogs: studyLog[];
}

export interface TripRetrospect {
    name: string;
    startDate: string;
    endDate: string;
    totalFocusHours: number;
    studyLogCount: number;
    studyDays: number;
    history: History;
    studyLogIds: number[];
}

export const fetchTripRetrospect = async (
    tripId: number
): Promise<TripRetrospect> => {
    try {
        const { data } = await api.get<{ data: TripRetrospect }>(
            `/trips/${tripId}/retrospect`
        );

        console.log(data.data);
        return data.data;
    } catch (error: unknown) {
        if ((error as any)?.response?.status === 404) {
            throw new Error('해당하는 여행을 찾을 수 없습니다.');
        }

        throw new Error(
            '여행 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        );
    }
};

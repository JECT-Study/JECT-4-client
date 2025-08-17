export interface MissionMutationProps {
    tripId: number;
    stampId: number;
    missionId: number;
    missionContent: MissionContent;
}

export type Ids = Omit<MissionMutationProps, 'missionContent'>;

export interface MissionItem {
    missionId: number | string;
    missionName: string;
    completed: boolean;
    isEditing: boolean;
    isChecked: boolean;
}

export type ServerMissionItem = Omit<MissionItem, 'isEditing' | 'isChecked'>;
export type MissionContent = Pick<MissionItem, 'missionName'>;

export interface RequestSuccess {
    success: boolean;
    status: number;
    data: null;
}

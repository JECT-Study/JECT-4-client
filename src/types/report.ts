interface ReportSummary {
    completedTripCount: number;
    totalFocusHours: number;
    longestFocusHours: number;
}

interface TripReport {
    tripReportId: number;
    title: string;
    startDate: string;
    endDate: string;
    totalFocusHours: number;
    imageUrl: string | null;
}

export interface TripReports {
    summary: ReportSummary;
    tripReports: TripReport[];
}

interface DailyMission {
    studyLogDailyMissionId: number;
    missionName: string;
}

interface StudyLog {
    studyLogId: number;
    dailyMissions: DailyMission[];
    title: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
}

export interface History {
    studyLogs: StudyLog[];
    hasNext: boolean;
}

export interface DetailTripReport extends TripReport {
    content: string;
    studyLogCount: number;
    studyDays: number;
    imageTitle: string;
    history: History;
}

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
    imageUrl: string;
}

export interface TripReports {
    summary: ReportSummary;
    tripReports: TripReport[];
}

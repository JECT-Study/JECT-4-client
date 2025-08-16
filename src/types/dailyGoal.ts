interface PomodoroTimer {
    focusDurationInMinute: number;
    focusSessionCount: number;
}

export interface DailyGoal {
    pomodoro: PomodoroTimer;
    missionIds: (number | string)[];
}

export interface MutationDailyGoalProps {
    tripId: number;
    dailyGoal: DailyGoal;
}

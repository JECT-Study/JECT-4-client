// 포모도로 타이머에서 새로고침시 사용하는 localStorage의 데이터들
export const localStorageKeys = [
    'saveLocalStorage',
    'state',
    'isState',
    'sessionState',
    'missionState',
    'dailyGoalIdState',
    'checkedMissionState',
] as const;

export function clearPomodoroStorage() {
    localStorageKeys.forEach((key) => localStorage.removeItem(key));
}

export type LocalStorageKey = (typeof localStorageKeys)[number];

// 공부 기록 페이지 관련 데이터 삭제
export function clearLogStorage() {
    const keys = [
        'saveLocalStorage',
        'tripId',
        'stampId',
        'dailyGoal',
        'dailyMissions',
        'text',
    ] as const;

    keys.forEach((key) => localStorage.removeItem(key));
}

// 필요하면 한 번에 모두 삭제
export function clearAllStorage() {
    clearPomodoroStorage();
    clearLogStorage();
}

import type { GoalCardProps } from '@/pages/history/_componenets/GoalCard';

type GoalTypeKeys = GoalCardProps['type'];

type GoalContentObject = {
    [K in GoalTypeKeys]: number;
};

export const history = [
    {
        date: '2025.09.28',
        contents: ['발표용 메모/스크립트 정리', '제출 & 백업'],
    },
    {
        date: '2025.09.29',
        contents: ['발표용 메모/스크립트 정리 2', '제출 & 백업 2'],
    },
    {
        date: '2025.09.30',
        contents: ['발표용 메모/스크립트 정리', '제출 & 백업'],
    },
    {
        date: '2025.10.01',
        contents: ['발표용 메모/스크립트 정리', '제출 & 백업'],
    },
    {
        date: '2025.10.02',
        contents: ['발표용 메모/스크립트 정리', '제출 & 백업'],
    },
];

export const goalCardContents: GoalContentObject = {
    learning: 36,
    session: 12,
    studyDays: 7,
};

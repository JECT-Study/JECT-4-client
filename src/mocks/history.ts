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

export const tripCardContents = [
    {
        title: '조별과제 PPT 만들기',
        time: 36,
        date: '2025.6.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/736x/9c/66/ff/9c66ffff5afebae55187fa8d12a75272.jpg',
    },
    {
        title: '중간고사 벼락치기',
        time: 56,
        date: '2025.4.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/736x/71/b4/9e/71b49ef20308ef8cd87a4b427c71bb21.jpg',
    },
    {
        title: '조별과제 PPT 만들기',
        time: 36,
        date: '2025.6.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/736x/18/2f/31/182f313eb623a9df1d200c1b00b893ad.jpg',
    },

    {
        title: '중간고사 벼락치기',
        time: 56,
        date: '2025.4.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/736x/a8/27/c1/a827c152c9117db7d9fd1856bc5a795a.jpg',
    },
    {
        title: '조별과제 PPT 만들기',
        time: 36,
        date: '2025.6.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/1200x/00/30/c4/0030c4a2e55c8ea8c8f854d9844785c6.jpg',
    },
    {
        title: '중간고사 벼락치기',
        time: 56,
        date: '2025.4.4 ~ 2025.6.18',
        imageUrl:
            'https://i.pinimg.com/736x/f2/5a/b1/f25ab128f79bb784207b479b42679909.jpg',
    },
];

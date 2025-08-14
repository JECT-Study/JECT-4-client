export const alignStyleClass = {
    left: 'justify-start pl-[1.25rem]',
    right: 'justify-end pr-[1.3rem]',
    center: 'justify-center pl-[6.25rem]',
} as const;

export const goalStateNumberStyleClass = {
    enable: 'text-[#C6C5BF]',
    goal: 'text-[#F8BE66]',
    complete: 'text-text-sub',
} as const;

const subTextClass = 'text-text-sub';

export const goalStateTitleStyleClass = {
    enable: 'text-[#C6C5BF]',
    goal: subTextClass,
    complete: subTextClass,
} as const;

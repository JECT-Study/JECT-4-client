export const alignStyleClass = {
    left: 'justify-start pl-[1.25rem]',
    right: 'justify-end pr-[1.3rem]',
    center: 'absolute justify-center top-[17%] left-[59%] transform translate-x-[-50%] translate-y-[-50%]',
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

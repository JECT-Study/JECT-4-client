export const alignStyleClass = {
    left: 'min-w-[22rem] justify-start pl-[0.5rem]',
    right: 'min-w-[22rem] justify-end pr-[2.2rem]',
    center: 'absolute top-[-30%] left-[50%] transform translate-x-[-50%] translate-y-[-40%]',
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

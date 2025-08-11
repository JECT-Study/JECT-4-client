import CalendarIcon from '../../../../assets/icons/calendar.svg?react';

const CalendarButton = () => {
    return (
        <button className="bg-text-sub flex w-[5.25rem] cursor-pointer items-center justify-center gap-1.5 rounded-[0.9375rem]">
            <CalendarIcon />
            <span className="text-sm font-light text-white">캘린더</span>
        </button>
    );
};

export default CalendarButton;

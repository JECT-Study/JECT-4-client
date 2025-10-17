import { useState } from 'react';
import ChevronLeft from '../../../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../../../assets/icons/chevron-right.svg?react';
import { getCalendarDate } from '../../../../utils/date';

interface CalendarProps {
    startDate: string;
    isModal?: boolean;
    onSelectDate: (selectedDate: Date) => void;
}

interface DateInfo {
    date: number;
    monthOffset: -1 | 0 | 1;
}

const Calendar: React.FC<CalendarProps> = ({
    startDate,
    isModal = false,
    onSelectDate,
}) => {
    const {
        year: initialYearStr,
        month: initialMonthStr,
        day: initialDayStr,
    } = getCalendarDate(startDate);

    const [currentYear, setCurrentYear] = useState(Number(initialYearStr));
    const [currentMonth, setCurrentMonth] = useState(
        Number(initialMonthStr) - 1
    );
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const startAllowedDate = new Date(
        Number(initialYearStr),
        Number(initialMonthStr) - 1,
        Number(initialDayStr)
    );
    startAllowedDate.setHours(0, 0, 0, 0);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0);

    const daysInCurrentMonth = lastDayOfMonth.getDate();
    const startWeekDay = firstDayOfMonth.getDay();
    const daysInPrevMonth = prevMonthLastDay.getDate();

    const dates: DateInfo[] = [];

    for (let i = startWeekDay - 1; i >= 0; i--) {
        dates.push({ date: daysInPrevMonth - i, monthOffset: -1 });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
        dates.push({ date: i, monthOffset: 0 });
    }

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prev) => prev + 1);
        } else {
            setCurrentMonth((prev) => prev + 1);
        }
    };

    const handleSelect = (dayInfo: DateInfo) => {
        let yearForDate = currentYear;
        let monthForDate = currentMonth + dayInfo.monthOffset;

        if (monthForDate < 0) {
            monthForDate = 11;
            yearForDate -= 1;
        } else if (monthForDate > 11) {
            monthForDate = 0;
            yearForDate += 1;
        }

        const newlySelectedDate = new Date(
            yearForDate,
            monthForDate,
            dayInfo.date
        );

        newlySelectedDate.setHours(12, 0, 0, 0);

        setSelectedDate(newlySelectedDate);
        onSelectDate(newlySelectedDate);
    };

    return (
        <div className="rounded-2xl bg-white px-4 py-5 shadow">
            <div className="flex items-center justify-between px-4 pb-4">
                {currentYear > Number(initialYearStr) ||
                (currentYear === Number(initialYearStr) &&
                    currentMonth > Number(initialMonthStr) - 1) ? (
                    <ChevronLeft
                        onClick={handlePrevMonth}
                        className="h-5 w-5 cursor-pointer text-gray-400"
                    />
                ) : null}

                <h2 className="text-subtitle text-text-sub flex w-full justify-center font-semibold">
                    {currentYear}년 {currentMonth + 1}월
                </h2>

                <ChevronRight
                    onClick={handleNextMonth}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                />
            </div>

            {/* 요일 */}
            <div className="flex flex-col items-center">
                <div className="text-text-min grid w-full grid-cols-7">
                    {daysOfWeek.map((day) => (
                        <div className="text-center" key={day}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* 날짜 */}
                <div className="grid w-full grid-cols-7 pt-3">
                    {dates.map((dayInfo, index) => {
                        const isCurrentMonth = dayInfo.monthOffset === 0;

                        let cellActualYear = currentYear;
                        let cellActualMonth =
                            currentMonth + dayInfo.monthOffset;

                        if (cellActualMonth < 0) {
                            cellActualMonth = 11;
                            cellActualYear -= 1;
                        } else if (cellActualMonth > 11) {
                            cellActualMonth = 0;
                            cellActualYear += 1;
                        }

                        const currentCellActualDate = new Date(
                            cellActualYear,
                            cellActualMonth,
                            dayInfo.date
                        );

                        currentCellActualDate.setHours(0, 0, 0, 0);

                        const isBeforeStartDate =
                            currentCellActualDate < startAllowedDate;

                        const isEnabled = isCurrentMonth && !isBeforeStartDate;

                        const isSelected =
                            selectedDate !== null &&
                            selectedDate.getFullYear() === cellActualYear &&
                            selectedDate.getMonth() === cellActualMonth &&
                            selectedDate.getDate() === dayInfo.date;

                        return (
                            <div
                                key={index}
                                className={`text-small flex h-10 w-full items-center justify-center rounded-full ${!isCurrentMonth ? 'text-gray-300' : ''} ${!isEnabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'} ${isSelected ? 'bg-point2 text-white' : ''} `}
                                onClick={() =>
                                    isEnabled && handleSelect(dayInfo)
                                }
                            >
                                {dayInfo.date}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* {isModal && (
                <div className="flex items-center gap-2 pt-4 pl-3">
                    <input
                        type="checkbox"
                        className="accent-text-sub mb-1 h-[1.1875rem] w-[1.1875rem]"
                    />
                    <p className="text-text-min text-body">마감일 없음</p>
                </div>
            )} */}
        </div>
    );
};

export default Calendar;

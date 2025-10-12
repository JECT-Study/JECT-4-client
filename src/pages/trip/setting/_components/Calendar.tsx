import { useState } from 'react';
import ChevronLeft from '../../../../assets/icons/chevron-left.svg?react';
import ChevronRight from '../../../../assets/icons/chevron-right.svg?react';

interface CalendarProps {
    year: number;
    month: number;
}

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentYear, setCurrentYear] = useState(year);
    const [currentMonth, setCurrentMonth] = useState(month);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const firstDay = new Date(year, currentMonth, 1);
    const lastDay = new Date(year, currentMonth + 1, 0);

    const prevMonthLastDay = new Date(year, currentMonth, 0);

    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay();
    const prevDays = prevMonthLastDay.getDate();

    const dates: (number | null)[] = [];

    for (let i = startDay - 1; i >= 0; i--) {
        dates.push(prevDays - i);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(i);
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

    const handleSelect = (day: number | null) => {
        if (!day) return;

        setSelectedDate(new Date(year, currentMonth, day));
    };

    return (
        <div className="rounded-2xl bg-white px-4 py-5 shadow">
            <div className="flex items-center justify-between px-4 pb-4">
                <ChevronLeft
                    onClick={handlePrevMonth}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                />
                <h2 className="text-subtitle text-text-sub font-semibold">
                    {currentMonth + 1}월
                </h2>
                <ChevronRight
                    onClick={handleNextMonth}
                    className="h-5 w-5 cursor-pointer text-gray-400"
                />
            </div>

            <div className="text-text-min grid grid-cols-7 pl-1 text-center text-sm">
                {daysOfWeek.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="text-cente4 grid grid-cols-7 gap-1 pt-3 pl-2">
                {dates.map((day, index) => {
                    const isCurrentMonth = day && index >= startDay;

                    const isSelected =
                        day &&
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === currentMonth;

                    return (
                        <div
                            key={index}
                            className={`text-small flex h-10 w-10 items-center justify-center rounded-full ${!isCurrentMonth ? 'text-gray-300' : 'cursor-pointer'} ${isSelected ? 'bg-point2 text-white' : ''}`}
                            onClick={() => isCurrentMonth && handleSelect(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;

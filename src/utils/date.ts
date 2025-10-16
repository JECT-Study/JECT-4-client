import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 앱 시작 시 한국 시간 설정
dayjs.locale('ko');

export function getTodayDate(): string {
    return dayjs().format('YYYY년 M월 D일');
}

export function getCalendarDate(date: string): {
    year: string;
    month: string;
    day: string;
} {
    const parsedDate = dayjs(date, 'YYYY-MM-DD', true);

    if (!parsedDate.isValid()) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD');
    }

    return {
        year: parsedDate.format('YYYY'),
        month: parsedDate.format('M'),
        day: parsedDate.format('D'),
    };
}

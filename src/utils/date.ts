import dayjs from 'dayjs';
import 'dayjs/locale/ko';

// 앱 시작 시 한국 시간 설정
dayjs.locale('ko');

export function getTodayDate(): string {
    return dayjs().format('YYYY년 M월 D일');
}

export function getCalendarDate(date: string) {
    const [year, month, day] = date.split('-');

    return { year, month, day };
}

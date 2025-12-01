import { useState } from 'react';
import { useNavigate } from 'react-router';
import { clsx } from 'clsx';
import { useSetAtom, useAtomValue } from 'jotai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

import { getTodayDate } from '@utils/date';
import CalendarIcon from '@assets/icons/calendar_icon.svg';
import { travelInfoAtom } from '@store/travelInfoAtom';
import type { TravelInfo } from '@store/travelInfoAtom';

interface SetTravelNameFormProps {
    travelType: 'course' | 'explore';
}

const SetTravelNameForm = ({ travelType }: SetTravelNameFormProps) => {
    const ENDDATE_HELPER_TEXT = {
        course: '* 필수로 입력해주세요.',
        explore: '* 선택사항입니다.',
    };

    const navigate = useNavigate();

    const travelInfo = useAtomValue(travelInfoAtom);

    const [travelName, setTravelName] = useState(travelInfo.name);
    const [endDate, setEndDate] = useState<Date | null>(
        travelInfo.endDate ? parseISO(travelInfo.endDate) : null
    ); // 최종 저장값
    const [memo, setMemo] = useState(travelInfo.memo);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const isDisabled = travelName.trim() === '';
    const setTravelInfo = useSetAtom(travelInfoAtom);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setTravelInfo((prev: TravelInfo) => ({
            ...prev,
            name: travelName,
            memo: memo,
            category: travelType === 'course' ? 'COURSE' : 'EXPLORE',
            endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
            // stamps는 여기서 건드리지 않음
        }));

        navigate('/set-stamp-linear'); // 스탬프 설정 (선형) 페이지 이동
    };

    const todayDate = getTodayDate();
    const today = new Date();

    const handleComplete = () => {
        setIsDatePickerOpen(false);
    };

    const handleCancel = () => {
        setEndDate(null); // 원래 값으로 되돌림

        setIsDatePickerOpen(false);
    };

    // 여행 정보 저장하기

    return (
        <form onSubmit={handleFormSubmit} className="mt-10 flex flex-col gap-3">
            {/* 여행 출발일 필드 (자동) */}
            <div className="flex flex-col gap-2">
                <label className="text-small text-secondary opacity-60">
                    출발일
                    <span className="text-point1"> *</span>
                </label>
                <span className="text-text-min/40 text-subtitle border-input-sub bg-input-focus h-[50px] rounded-md border py-2.5 pl-[15px]">
                    {todayDate}
                </span>
            </div>

            {/* 여행 도착일 필드 */}
            <div className="relative flex flex-col gap-2">
                <label
                    className="text-small text-secondary opacity-60"
                    htmlFor="date"
                >
                    도착일
                    <span className="text-point1"> *</span>
                </label>

                <input
                    readOnly
                    type="text"
                    value={endDate ? format(endDate, 'yyyy년 M월 d일') : ''}
                    className="text-subtitle text-text-sub border-input-sub w-full rounded-md border bg-white px-4 py-2 pr-10 transition focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => setIsDatePickerOpen(true)}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    aria-label="입력 지우기"
                >
                    <img src={CalendarIcon} alt="calendar" className="w-6" />
                </button>

                <span
                    className={clsx(
                        'text-small',
                        travelType === 'course' ? 'text-point1' : 'text-primary'
                    )}
                >
                    {ENDDATE_HELPER_TEXT[travelType]}
                </span>

                {isDatePickerOpen && (
                    <div className="absolute top-20 right-0 z-10 bg-white">
                        <DatePicker
                            locale={ko}
                            inline
                            selectsEnd
                            selected={today}
                            startDate={today} //시작일은 오늘
                            endDate={endDate}
                            minDate={today} // 오늘 이전은 선택 불가
                            onChange={(update) => {
                                setEndDate(update);
                            }}
                        />
                        <div className="flex gap-2">
                            <div className="flex w-full border-t border-[#e3e3e3]">
                                <button
                                    className="text-text-min text-body w-1/2 border-r border-[#e3e3e3] px-4 py-3"
                                    onClick={handleCancel}
                                >
                                    취소
                                </button>
                                <button
                                    className="text-text-sub text-body w-1/2 px-4 py-3"
                                    onClick={handleComplete}
                                >
                                    완료
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 여행 이름 설정 */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="travel-name"
                    className="text-small text-secondary opacity-60"
                >
                    여행 이름
                </label>
                <input
                    id="travel-name"
                    value={travelName}
                    onChange={(e) => setTravelName(e.target.value)}
                    className="text-subtitle text-text-sub border-input-sub h-[50px] rounded-md border bg-white py-2.5 pl-[15px] placeholder:opacity-40"
                />
            </div>

            {/* 여행 메모 설정 */}
            <div className="mb-20 flex flex-col gap-2">
                <label
                    htmlFor="memo"
                    className="text-small text-secondary opacity-60"
                >
                    메모 추가
                </label>
                <textarea
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="꼭 지켜야 할 내용을 작성해 주세요. "
                    className="text-text-sub text-body placeholder:text-text-min border-input-sub h-24 rounded-md border bg-white pt-[11px] pl-[15px] placeholder:opacity-40"
                />
            </div>

            <button
                type="submit"
                disabled={isDisabled}
                className={clsx(
                    'flex h-12 w-full cursor-pointer items-center justify-center rounded-lg text-white',
                    isDisabled ? 'bg-primary/70' : 'bg-primary'
                )}
            >
                다음
            </button>
        </form>
    );
};

export default SetTravelNameForm;

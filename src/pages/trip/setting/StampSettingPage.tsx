import BackHeader from '../../../components/common/BackHeaderLayout';

import BxCalendarIcon from '../../../assets/icons/bx_calendar.svg?react';
import CalendarIcon from '../../../assets/icons/calendar.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import Button from './_components/Button';
import ProgressBar from './_components/ProgressBar';

const StampSettingPage = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="h-[4rem]">
                <BackHeader title="여행 / 스탬프 설정" />
            </div>
            <section className="flex flex-col gap-1">
                <p className="text-text-sub text-body">나의 여행</p>
                <article className="bg-text-sub flex h-[4.875rem] items-center justify-between rounded-xl p-5">
                    <div className="flex flex-col gap-1">
                        <h4 className="text-subtitle text-background font-semibold">
                            토익 뿌시기
                        </h4>
                        <div className="flex gap-1">
                            <CalendarIcon />
                            <p className="text-background text-caption">
                                2025.07.05 ~ 07.15
                            </p>
                        </div>
                    </div>
                    <button className="cursor-pointer">
                        <EditIcon className="fill-white" />
                    </button>
                </article>
            </section>
            <section className="flex flex-col gap-2 pt-3">
                <p className="text-text-sub text-body">나의 스탬프</p>
                <div>
                    <article className="flex flex-col gap-2 rounded-xl bg-white px-5 py-[0.6875rem] shadow-[0_6px_18px_0_rgba(0,0,0,0.08)]">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <h5 className="text-text-sub text-body font-medium">
                                        오답 분석 및 정리
                                    </h5>
                                    <div className="flex items-center justify-center rounded-b-md bg-[#F8F7F5] px-2 py-[0.0625rem]">
                                        <span className="text-text-sub text-caption">
                                            진행 중
                                        </span>
                                    </div>
                                </div>
                                <button className="cursor-pointer">
                                    <EditIcon className="fill-[#EEE7D8]" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1">
                                <BxCalendarIcon className="ml-[-0.05rem]" />
                                <p className="text-text-sub text-caption">
                                    2025. 07. 12
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <ProgressBar
                                completedLength={1}
                                progressLength={5}
                            />
                            <Button isCompleted={true} />
                        </div>
                    </article>
                </div>
            </section>
            <div className="pt-5">
                <button className="text-secondary flex w-full items-center justify-center rounded-xl bg-[#EEE7D8] px-4 py-8">
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
};

export default StampSettingPage;

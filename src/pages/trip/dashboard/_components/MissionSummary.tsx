import CalendarButton from '../_components/CalendarButton';
import SessionGraph from '../_components/SessionGraph/SessionGraph';
import WriteIcon from '../../../../assets/icons/write.svg?react';
import type { Mission } from '../_hooks/useDashboardMissions';

interface MissionSummaryProps {
    missions: Mission[];
    checkedCount: number;
}

const MissionSummary = ({ missions, checkedCount }: MissionSummaryProps) => {
    return (
        <section className="h-[7.825rem]">
            <div className="bg-plus-background flex shrink-0 flex-col rounded-xl p-4">
                <div className="flex w-full items-center gap-1.5">
                    {missions.length ? (
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex justify-between">
                                <h5 className="text-text-sub text-xl font-bold">
                                    {`${checkedCount}/${missions.length} 세션 진행 중`}
                                </h5>
                                <CalendarButton />
                            </div>
                            <span className="text-text-sub">1:30:00</span>
                        </div>
                    ) : (
                        <>
                            <WriteIcon className="h-[1.375rem] w-[1.375rem]" />
                            <span className="text-text-sub text-lg font-medium">
                                학습 세션이 아직 시작되지 않았습니다
                            </span>
                        </>
                    )}
                </div>
                <div className="flex h-13 overflow-x-hidden pt-5">
                    {missions.map((mission, index) => (
                        <SessionGraph
                            key={mission.id}
                            isCompleted={mission.isChecked}
                            isLast={index === missions.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionSummary;

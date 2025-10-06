import { useState } from 'react';
import RightArrowIcon from '@assets/icons/right_arrow.svg?react';

interface CompletedMission {
    studyLogDailyMissionId: number;
    missionName: string;
}

interface LogCardProps {
    log: {
        studyLogId: number;
        title: string;
        content: string;
        createdAt: string;
        dailyMissions: CompletedMission[];
    };
}

const LogCard = ({ log }: LogCardProps) => {
    const [isExpaneded, setIsExpanded] = useState(false);

    const createdDate = log.createdAt.split(' ')[0];
    return (
        <div>
            <div className="border-point2 rounded-[6px] border bg-white">
                <div className="border-point2 bg-history text-text-sub -m-px flex flex-col gap-1 rounded-[6px] border p-4">
                    <div className="text-history-subtitle flex justify-between">
                        {createdDate.split('-').join('. ')}
                        <button className="px-1">
                            <RightArrowIcon
                                className={
                                    !isExpaneded
                                        ? 'rotate-90 transition-transform'
                                        : 'rotate-270 transition-transform'
                                }
                                onClick={() => setIsExpanded(!isExpaneded)}
                            />
                        </button>
                    </div>
                    <div className="h-[1px] w-5/6 bg-white"></div>
                    <div className="text-small">{log.title}</div>
                </div>
                {isExpaneded && (
                    <div>
                        <div className="bg-background px-4 pt-4">
                            <div>
                                <ul className="text-text-sub list-inside list-disc space-y-2">
                                    {log.dailyMissions.map((m) => (
                                        <li
                                            key={m.studyLogDailyMissionId}
                                            className="text-small"
                                        >
                                            {m.missionName}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-2 rounded-[6px]">사진 영역</div>
                        </div>
                        <div className="text-caption text-text-min rounded-b-[6px] bg-white px-4 py-2">
                            {log.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogCard;

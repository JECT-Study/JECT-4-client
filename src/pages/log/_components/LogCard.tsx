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
        imageUrl: string | null;
        dailyMissions: CompletedMission[];
    };
}

const LogCard = ({ log }: LogCardProps) => {
    const [isExpaneded, setIsExpanded] = useState(false);

    const createdDate = log.createdAt.split(' ')[0];
    return (
        <div>
            <div className="border-point2 rounded-md border bg-white">
                <div className="border-point2 bg-history text-text-sub -m-px flex flex-col gap-1 rounded-md border p-4">
                    <div className="text-history-subtitle flex justify-between">
                        {createdDate.split('-').join('. ')}
                        <button
                            className="px-1"
                            type="button"
                            onClick={() => setIsExpanded(!isExpaneded)}
                            aria-expanded={isExpaneded}
                        >
                            <RightArrowIcon
                                className={
                                    !isExpaneded
                                        ? 'rotate-90 transition-transform'
                                        : 'rotate-270 transition-transform'
                                }
                            />
                        </button>
                    </div>
                    <div className="h-[1px] w-5/6 bg-white"></div>
                    <div className="text-small">{log.title}</div>
                </div>
                {isExpaneded && (
                    <div>
                        <div className="bg-background p-4">
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
                            {log.imageUrl && (
                                <div className="mt-2 aspect-video overflow-hidden rounded-md">
                                    <img
                                        src={log.imageUrl}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        {log.content && (
                            <div className="rounded-b-md bg-white px-4 py-2">
                                <pre className="font-pre text-caption text-text-min whitespace-pre-wrap">
                                    {log.content}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogCard;

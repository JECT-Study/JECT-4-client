import { useState } from 'react';
import PomodoroMissionItem from './PomodoroMissionItem';

interface DailyMission {
    dailyMissionId: number;
    missionName: string;
}

type Props = {
    isAutoStop: boolean;
    isStarted: boolean;
    stampName: string;
    focusDurationInMinute: number;
    dailyMissions: DailyMission[];
    onCheckedChange: (checkedIds: number[]) => void;
};

const PomodoroMissionModal = ({
    isAutoStop,
    isStarted,
    stampName,
    focusDurationInMinute,
    dailyMissions,
    onCheckedChange,
}: Props) => {
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const handleToggle = (id: number) => {
        const newCheckedIds = checkedIds.includes(id)
            ? checkedIds.filter((cid) => cid !== id)
            : [...checkedIds, id];

        setCheckedIds(newCheckedIds);
        onCheckedChange(newCheckedIds); // ✅ 상위로 전달
    };

    if (isAutoStop) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-title text-text-sub">
                    {Number(focusDurationInMinute)}분 집중 완료!
                </div>
                <div className="text-caption text-text-sub">
                    이제 잠깐 숨을 돌릴 시간이에요. 5분 휴식하세요.
                </div>
            </div>
        );
    }

    return (
        <div className="text-text-sub rounded-b-xl bg-white px-7 py-4 shadow-[0_8px_12px_rgba(168,168,168,0.12)]">
            <div className="pb-4 text-[18px] font-semibold">{stampName}</div>
            <div className="text-body flex flex-col gap-4">
                {dailyMissions.map((mission) => (
                    <PomodoroMissionItem
                        key={mission.dailyMissionId}
                        id={mission.dailyMissionId}
                        name={mission.missionName}
                        checked={checkedIds.includes(mission.dailyMissionId)} // ✅ 체크 상태 전달
                        onToggle={() => handleToggle(mission.dailyMissionId)} // ✅ 클릭 핸들러
                        disabled={!isStarted}
                    />
                ))}
            </div>
        </div>
    );
};

export default PomodoroMissionModal;

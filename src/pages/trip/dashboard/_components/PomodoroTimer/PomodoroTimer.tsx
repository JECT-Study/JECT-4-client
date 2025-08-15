import Picker from 'react-mobile-picker';

const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
);
const sessions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export type TimeValue = { minute: string; session: string };

interface PomodoroTimerProps {
    value: TimeValue;
    onChange: (v: TimeValue) => void;
}

const PomodoroTimer = ({ value, onChange }: PomodoroTimerProps) => {
    return (
        <Picker
            className="flex w-[90%]"
            value={value}
            onChange={onChange}
            wheelMode="normal"
            height={150}
            itemHeight={60}
        >
            <Picker.Column name="minute">
                {minutes.map((minute) => (
                    <Picker.Item
                        className="text-secondary text-5xl"
                        key={minute}
                        value={minute}
                    >
                        {minute}
                    </Picker.Item>
                ))}
            </Picker.Column>
            <div className="flex items-center">
                <span className="text-body text-custom-gray">분</span>
            </div>
            <Picker.Column name="session">
                {sessions.map((session) => (
                    <Picker.Item
                        className="text-secondary text-5xl"
                        key={session}
                        value={session}
                    >
                        {session}
                    </Picker.Item>
                ))}
            </Picker.Column>
            <div className="flex items-center">
                <span className="text-body text-custom-gray">세션</span>
            </div>
        </Picker>
    );
};

export default PomodoroTimer;

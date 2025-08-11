interface LineConnectorProps {
    color: string;
    length: number;
    isDashed?: boolean;
    children?: React.ReactNode;
}

const LineConnector: React.FC<LineConnectorProps> = ({
    color,
    length,
    isDashed = false,
    children = undefined,
}) => {
    return (
        <svg
            width={length}
            height="24"
            viewBox={`0 0 ${length} 24`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                x1="1"
                y1="12"
                x2={length}
                y2="12"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={isDashed ? '10 13' : undefined}
                strokeDashoffset={isDashed ? '-6.5' : undefined}
            />
            {children}
        </svg>
    );
};

export default LineConnector;

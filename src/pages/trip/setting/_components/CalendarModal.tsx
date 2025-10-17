import ReactDOM from 'react-dom';
import Calendar from './Calendar';

interface CalendarModalProps {
    startDate: string;
    onClose: () => void;
    onSelectDate: (selectedDate: Date) => void;
}

const CalendarModal = ({
    startDate,
    onClose,
    onSelectDate,
}: CalendarModalProps) => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
            onClick={onClose}
        >
            <div
                className="w-[95%] max-w-[21.875rem]"
                onClick={(e) => e.stopPropagation()}
            >
                <Calendar
                    onSelectDate={onSelectDate}
                    startDate={startDate}
                    isModal
                />
            </div>
        </div>,
        modalRoot
    );
};

export default CalendarModal;

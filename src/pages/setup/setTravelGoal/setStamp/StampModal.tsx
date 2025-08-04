import ReactDOM from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    className?: string;
    backdropClassName?: string;
    children?: React.ReactNode;
}

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    className = '',
    backdropClassName = '',
    children,
}: ModalProps) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${backdropClassName || 'bg-black/40'}`}
            onClick={onClose}
        >
            <div
                className={`max-w-md rounded-xl bg-white shadow-xl ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-subtitle text-secondary flex flex-col items-center pt-4 text-center">
                    <div className="px-8">
                        ㅇㅇ님의 여정이 완성되었어요!
                        <br />
                        <span className="text-text-sub">ㅇㅇ 여행</span>을
                        시작해볼까요?
                    </div>
                </div>
                <div className="text-secondary my-2 max-h-72 overflow-y-auto px-8">
                    <div className="bg-primary text-small mb-2 inline-block rounded-full px-2.5 py-1 font-bold text-white">
                        2025. 7. 4
                    </div>
                    <div>{children}</div>
                    <div className="bg-point1 text-small mt-2 inline-block rounded-full px-2.5 py-1 font-bold text-white">
                        2025. 7. 15
                    </div>
                </div>
                <div className="flex w-full border-t border-[#e3e3e3] text-[18px] font-semibold">
                    <button
                        className="text-text-min w-1/2 border-r border-[#e3e3e3] px-4 py-3"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="text-text-sub w-1/2 px-4 py-5"
                        onClick={onConfirm}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;

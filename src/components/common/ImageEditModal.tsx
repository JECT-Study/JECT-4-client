import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onEdit,
    onDelete,
    children,
}: ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={
                'fixed inset-0 z-50 flex items-center justify-center bg-black/30'
            }
            onClick={onClose}
        >
            <div
                className={'w-5/6 max-w-md rounded-xl bg-white shadow-xl'}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-subtitle text-secondary flex flex-col items-center pt-4 text-center">
                    사진을 수정할까요?
                </div>
                <div className="text-small text-secondary mt-7 max-h-72 overflow-y-auto px-8">
                    {children}
                </div>
                <div className="mt-7 flex w-full border-t border-[#e3e3e3] text-[18px]/9 font-semibold">
                    <button
                        className="text-text-min w-1/2 border-r border-[#e3e3e3] px-4 py-3"
                        onClick={onDelete}
                    >
                        삭제
                    </button>
                    <button
                        className="text-text-sub w-1/2 px-4 py-3"
                        onClick={onEdit}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;

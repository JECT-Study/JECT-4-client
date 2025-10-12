import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = '확인',
    cancelText = '취소',
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
                className={
                    'flex w-[20.625rem] max-w-md flex-col items-center rounded-xl bg-white shadow-xl'
                }
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-subtitle text-secondary flex flex-col items-center pt-8 text-center">
                    {title}
                </div>
                <div className="text-small text-secondary my-2 max-h-72 overflow-y-auto px-8">
                    {children}
                </div>
                <div className="mt-7 flex w-full border-t border-[#e3e3e3] text-[18px]/9 font-semibold">
                    <button
                        className="text-text-min w-1/2 border-r border-[#e3e3e3] px-4 py-3"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="text-text-sub w-1/2 px-4 py-3"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;

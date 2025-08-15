import { type ReactNode, useEffect } from 'react';

interface MainContainerProps {
    open: boolean;
    title?: string;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm?: () => void;
    disableBackdropClose?: boolean;
}

const ModalContainer = ({
    open,
    title,
    children,
    confirmText = '확인',
    cancelText = '취소',
    onClose,
    onConfirm,
    disableBackdropClose,
}: MainContainerProps) => {
    useEffect(() => {
        if (!open) return;

        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* 배경 */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => {
                    if (!disableBackdropClose) onClose();
                }}
            />
            {/* 컨텐츠 */}
            <div className="relative w-[20.625rem] max-w-[90vw] overflow-hidden rounded-xl bg-white shadow-xl">
                {title && (
                    <div className="flex justify-center px-5 py-4 text-lg font-semibold">
                        <span className="text-subtitle font-medium">
                            {title}
                        </span>
                    </div>
                )}
                <div className="py-4 pr-6">{children}</div>

                {/* 취소/확인 버튼 */}
                <div className="border-b-none grid grid-cols-2 gap-0 border-t border-[#E2E2E2]">
                    <button
                        type="button"
                        className="text-subtitle cursor-pointer border-r border-[#E2E2E2] py-4 font-medium text-gray-700"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className="text-text-sub text-subtitle cursor-pointer py-4 font-medium"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalContainer;

import ReactDOM from 'react-dom';
import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

interface ModalProps {
    stampName: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    className?: string;
    backdropClassName?: string;
    children?: React.ReactNode;
}

const Modal = ({
    stampName,
    isOpen,
    onClose,
    onConfirm,
    children,
}: ModalProps) => {
    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={
                'fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur'
            }
            onClick={onClose}
        >
            <div
                className={'max-w-md rounded-xl bg-white shadow-xl'}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-subtitle text-secondary flex flex-col items-center pt-4 text-center">
                    <div className="px-8">
                        {userName}님의 여정이 완성되었어요!
                        <br />
                        <span className="text-text-sub">{stampName} 여행</span>
                        을 시작해볼까요?
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

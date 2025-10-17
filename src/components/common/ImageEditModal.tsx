import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    imgSrc?: string;
}

const ImageEditModal = ({
    isOpen,
    onClose,
    onEdit,
    onDelete,
    imgSrc,
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
                <div className="mt-7 max-h-72 px-8">
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={imgSrc}
                            alt="미리보기"
                            className="h-full w-full object-cover"
                        />
                    </div>
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

export default ImageEditModal;

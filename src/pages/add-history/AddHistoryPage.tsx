import MissionHistory from '@components/history/MissionHistory.tsx';
import MainButton from '@components/common/button/MainButton.tsx';
import GoalCard, { type GoalCardProps } from './_components/GoalCard';
import PhotoIcon from '@assets/icons/logPhoto.svg?react';
import ImageEditModal from '@components/common/ImageEditModal';
import { useImageUpload } from '@hooks/image/useImageUpload';

import { history, goalCardContents } from '../../mocks/history.ts';

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

const AddHistoryPage = () => {
    const {
        selectedFile,
        previewUrl,
        isModalOpen,
        fileInputRef,
        handleFileChange,
        handleAddPhotoClick,
        handleImageClick,
        handleEditImage,
        handleDeleteImage,
        setIsModalOpen,
    } = useImageUpload();

    return (
        <div>
            <div className="-mx-5 h-[90vh] overflow-y-auto px-5 pb-7">
                <section className="pt-16">
                    <h1 className="text-title text-secondary">
                        여행을 멋지게 완주했어요!
                    </h1>
                    <p className="text-small text-text-min">
                        ㅇㅇ님이 떠난 여정은 이렇게 이어졌어요.
                    </p>
                </section>
                <div className="bg-background sticky top-0 z-10 flex items-center justify-between pt-10">
                    <div className="bg-primary text-background text-small rounded-md p-1.5">
                        ㅇㅇ 여정
                    </div>
                    <div className="text-caption text-text-min">
                        년 월 일 ~ 년 월 일
                    </div>
                </div>
                <div className="mt-3 flex w-full gap-2.5">
                    {Object.keys(goalCardContents).map((keyAsString) => {
                        const type = keyAsString as keyof GoalCardContentsType;

                        return (
                            <GoalCard
                                type={type}
                                key={type}
                                goal={goalCardContents[type]}
                            />
                        );
                    })}
                </div>
                <div className="mt-5">
                    <div className="text-text-sub text-small">
                        공부 흔적을 사진으로 남겨보세요
                    </div>
                    <div className="mt-3">
                        {previewUrl ? (
                            <div
                                className="mb-2.5 aspect-video w-full overflow-hidden"
                                onClick={handleImageClick}
                            >
                                <img
                                    src={previewUrl}
                                    alt="미리보기"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="py-0.5">
                                <button
                                    type="button"
                                    onClick={handleAddPhotoClick}
                                    className="text-course-bagic border-text-sub text-body mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-dashed bg-white py-4"
                                >
                                    <PhotoIcon className="inline pb-0.5" />
                                    사진 추가하기
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="text-small text-primary mt-2">
                        * 선택사항입니다.
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {isModalOpen && previewUrl && (
                        <ImageEditModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onEdit={handleEditImage}
                            onDelete={handleDeleteImage}
                            title={
                                <div className="text-subtitle text-secondary -pt-4 flex flex-col items-center text-center font-semibold">
                                    사진을 수정할까요?
                                </div>
                            }
                            children={
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={previewUrl}
                                        alt="미리보기"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            }
                        />
                    )}
                </div>
                <div className="bg-background sticky top-18 z-10 pt-5">
                    <div className="text-text-sub text-small">회고록 작성</div>
                    <textarea
                        id="history-note"
                        className="border-input-sub mt-2 max-h-80 w-full rounded-md border bg-white px-4 py-3"
                        placeholder="이번 여정에서 내가 가장 기억하는 순간은…"
                    />
                </div>
                <div>
                    <MissionHistory type="write" historyList={history} />
                </div>
            </div>

            <div className="absolute bottom-12 w-[calc(100%-40px)]">
                <MainButton
                    onClick={() => {
                        console.log('완료');
                    }}
                >
                    완료
                </MainButton>
            </div>
        </div>
    );
};

export default AddHistoryPage;

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

import api from '@lib/axios';

import MissionHistory from '@components/history/MissionHistory.tsx';
import { type History } from '@components/history/MissionHistory.tsx';
import MainButton from '@components/common/button/MainButton.tsx';
import GoalCard, { type GoalCardProps } from './_components/GoalCard';
import PhotoIcon from '@assets/icons/logPhoto.svg?react';
import ImageEditModal from '@components/common/ImageEditModal';
import { useImageUpload } from '@hooks/image/useImageUpload';
import useTripRetrospect from '@hooks/trip/useTripRetrospect';
import { type studyLog } from '@services/trip/tripRetrospect';

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

const PAGE_SIZE = 5;

const AddHistoryPage = () => {
    const navigate = useNavigate();

    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    const [isFetching, setIsFetching] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    const pageRef = useRef(0);
    const isFetchingRef = useRef(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const [tripInfo, setTripInfo] = useState<GoalCardContentsType>({
        learning: 0,
        session: 0,
        studyDays: 0,
    });

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

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

    const { tripId: tripIdParam } = useParams<{ tripId: string }>();

    /* 형변환 및 유효성 검증 시 tripId가 변경되지 않을 경우, 재계산을 하지 않기 위해 useMemo 사용 */
    const tripId = useMemo(() => {
        const number = Number(tripIdParam);

        return Number.isFinite(number) && number > 0 ? number : null;
    }, [tripIdParam]);

    useEffect(() => {
        if (tripId === null) {
            alert('잘못된 여행 id입니다.');
            navigate(-1);
        }
    }, [tripId, navigate]);

    if (tripId === null) return null;

    const { data } = useTripRetrospect(tripId);

    useEffect(() => {
        console.log(data);
        setTripInfo({
            learning: data?.totalFocusHours || 0,
            session: data?.studyLogCount || 0,
            studyDays: data?.studyDays || 0,
        });
    }, [data]);

    const transformStudyLogs = (logs: studyLog[]): History[] => {
        const result = logs.map((log) => {
            return {
                date: log.createdAt.split(' ')[0].replace(/-/g, '.'), // "YYYY.MM.DD"
                contents: log.dailyMissions.map((m) => m.missionName), // missionName 배열
            };
        });
        console.log(result);
        return result;
    };

    const formatDateRange = (startDate: string, endDate: string) => {
        const format = (dateStr: string) => {
            const [year, month, day] = dateStr.split('-');
            return `${year}년 ${Number(month)}월 ${Number(day)}일`;
        };

        return `${format(startDate)} ~ ${format(endDate)}`;
    };

    // const lastLogRef = useCallback(
    //     (node: HTMLDivElement | null) => {
    //         if (observer.current) observer.current.disconnect();

    //         observer.current = new IntersectionObserver((entries) => {
    //             if (
    //                 entries[0].isIntersecting &&
    //                 hasNext &&
    //                 !isFetchingRef.current
    //             ) {
    //                 fetchLogs(false);
    //             }
    //         });

    //         if (node) observer.current.observe(node);
    //     },
    //     [hasNext, fetchLogs]
    // );

    return (
        <div>
            <div className="-mx-5 h-[90vh] overflow-y-auto px-5 pb-7">
                <section className="pt-16">
                    <h1 className="text-title text-secondary">
                        여행을 멋지게 완주했어요!
                    </h1>
                    <p className="text-small text-text-min">
                        {userName}님이 떠난 여정은 이렇게 이어졌어요.
                    </p>
                </section>
                <div className="bg-background sticky top-0 z-10 flex items-center justify-between pt-10">
                    <div className="bg-primary text-background text-small rounded-md p-1.5">
                        {data?.name} 여정
                    </div>
                    <div className="text-caption text-text-min">
                        {formatDateRange(
                            data?.startDate || '',
                            data?.endDate || ''
                        )}
                    </div>
                </div>
                <div className="mt-3 flex w-full gap-2.5">
                    {Object.keys(tripInfo).map((keyAsString) => {
                        const type = keyAsString as keyof GoalCardContentsType;

                        return (
                            <GoalCard
                                type={type}
                                key={type}
                                goal={tripInfo[type]}
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
                                    className="text-course-basic border-text-sub text-body mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-dashed bg-white py-4"
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
                            imgSrc={previewUrl}
                        />
                    )}
                </div>
                <div className="bg-background sticky top-18 z-10 pt-5">
                    <div className="text-text-sub text-small">회고록 작성</div>
                    <textarea
                        id="history-note"
                        className="text-custom-gray text-body border-input-sub mt-2 max-h-80 w-full rounded-md border bg-white px-4 py-3"
                        placeholder="이번 여정에서 내가 가장 기억하는 순간은…"
                    />
                </div>
                <div>
                    <MissionHistory
                        type="write"
                        historyList={transformStudyLogs(
                            data?.history.studyLogs || []
                        )}
                    />
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

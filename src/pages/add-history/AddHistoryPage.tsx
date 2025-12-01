import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

import api from '@lib/axios';
import axios from 'axios'; // S3 PUT 요청용

import PhotoIcon from '@assets/icons/logPhoto.svg?react';

import GoalCard, { type GoalCardProps } from './_components/GoalCard';
import MainButton from '@components/common/button/MainButton.tsx';
import MissionHistory from '@components/history/MissionHistory.tsx';

import ImageEditModal from '@components/common/ImageEditModal';

import { useImageUpload } from '@hooks/image/useImageUpload';
import useTripRetrospect from '@hooks/trip/useTripRetrospect';

interface TripReport {
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    studyLogCount: number;
    totalFocusHours: number;
    studyDays: number;
    imageTitle: string;
    studyLogIds: number[];
}

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

const PAGE_SIZE = 5;

const AddHistoryPage = () => {
    const navigate = useNavigate();

    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    const [content, setContent] = useState('');

    const [isUploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
    } = useTripRetrospect(tripId, PAGE_SIZE);

    const observerElem = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    const initialReport = useMemo(() => {
        return data?.pages?.[0];
    }, [data]);

    const initialMission = useMemo(() => {
        return (
            data?.pages?.flatMap((page) =>
                page.history.studyLogs.map((log) => ({
                    date: log.createdAt.split(' ')[0].replace(/-/g, '.'),
                    contents: log.dailyMissions.map((m) => m.missionName),
                }))
            ) || []
        );
    }, [data]);

    const goalCardContents = useMemo(() => {
        if (!initialReport) {
            return { learning: 0, session: 0, studyDays: 0 };
        }

        return {
            learning: initialReport.totalFocusHours,
            session: initialReport.studyLogCount,
            studyDays: initialReport.studyDays,
        };
    }, [initialReport]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px',
            threshold: 1.0,
        });

        const currentElem = observerElem.current;
        if (currentElem) observer.observe(currentElem);

        return () => {
            if (currentElem) observer.unobserve(currentElem);
        };
    }, [handleObserver]);

    if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
    if (!initialReport) return <p>여행 기록이 없습니다.</p>;

    const formatDateRange = (startDate: string, endDate: string) => {
        const format = (dateStr: string) => {
            const [year, month, day] = dateStr.split('-');
            return `${year}년 ${Number(month)}월 ${Number(day)}일`;
        };

        return `${format(startDate)} ~ ${format(endDate)}`;
    };

    //여행 리포트 생성 + 이미지 업로드 + Confirm 통합 함수
    const handleComplete = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const reportData: TripReport = {
            title: initialReport?.name || '',
            content: content,
            startDate: initialReport?.startDate || '',
            endDate: initialReport?.endDate || '',
            studyLogCount: initialReport?.studyLogCount || 0,
            totalFocusHours: initialReport?.totalFocusHours || 0,
            studyDays: initialReport?.studyDays || 0,
            imageTitle: selectedFile ? selectedFile.name : '',
            studyLogIds: initialReport?.studyLogIds || [],
        };

        try {
            // 1️. 여행 리포트 생성
            const response = await api.post(`/trip-reports`, reportData);

            const tripReportId = response.data.data.tripReportId;

            // 2️. 파일이 있다면 Presigned URL 요청 + 업로드 + Confirm
            if (selectedFile && !isUploading) {
                setUploading(true);

                // Presigned URL 요청
                const { data: presigned } = await api.post(
                    `/trip-reports/${tripReportId}/images/presigned`,
                    {
                        originFilename: selectedFile.name,
                    }
                );

                const { presignedUrl, tmpKey } = presigned.data;

                // S3 PUT 업로드
                await axios.put(presignedUrl, selectedFile, {
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                });

                // Confirm API 호출
                await api.post(`/trip-reports/${tripReportId}/images/confirm`, {
                    tmpKey,
                });
            }

            alert('여행 리포트가 생성되었습니다.');

            navigate(`/history/${tripReportId}`, {
                replace: true,
            });
        } catch (error) {
            alert('리포트 생성에 실패했습니다. 다시 시도해주세요.');
            console.error('❌ 리포트 생성 또는 업로드 실패', error);
        } finally {
            setUploading(false);
            setIsSubmitting(false);
        }
    };

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
                        {initialReport?.name} 여정
                    </div>
                    <div className="text-caption text-text-min">
                        {formatDateRange(
                            initialReport?.startDate || '',
                            initialReport?.endDate || ''
                        )}
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <MissionHistory type="write" historyList={initialMission} />
                    <div
                        ref={observerElem}
                        className="my-[0.625rem] h-[0.063rem]"
                    ></div>
                </div>
            </div>

            <div className="absolute bottom-12 w-[calc(100%-40px)]">
                <MainButton disabled={!content.trim()} onClick={handleComplete}>
                    완료
                </MainButton>
            </div>
        </div>
    );
};

export default AddHistoryPage;

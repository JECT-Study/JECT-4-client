// 셋업 이후 메인 화면
import MainTabButton from './MainTabButton';
import MainCardButton from './MainCardButton';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '@lib/axios'; // axios 인스턴스

import ConfirmModal from '../../components/common/ConfirmModal';

interface Travel {
    id: number;
    title: string;
    memo: string;
    progress: number;
    leftDays: number;
    tripCategory: string;
}

const PAGE_SIZE = 10;

const MainPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<
        'newTravel' | 'deleteTravel' | null
    >(null);
    const [targetTravelId, setTargetTravelId] = useState<number | null>(null);

    const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태
    const [travelList, setTravelList] = useState<Travel[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);

    const pageRef = useRef(0);
    const isFetchingRef = useRef(false); // fetch 중복 방지

    // 무한 스크롤 구현
    const fetchTravels = useCallback(async (reset = false) => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        setIsFetching(true);

        try {
            const currentPage = reset ? 0 : pageRef.current;
            console.log(
                'fetchTravels 호출, page:',
                currentPage,
                'reset:',
                reset
            );

            const response = await api.get('/trips', {
                params: { page: currentPage, size: PAGE_SIZE },
            });

            const tripInfos = response.data.data.tripInfos;
            const nextExists = response.data.data.hasNext;

            const mappedTravels: Travel[] = tripInfos.map((trip: any) => ({
                id: trip.tripId,
                title: trip.tripName,
                memo: trip.tripMemo,
                progress: trip.progress,
                leftDays: trip.dDay,
                tripCategory: trip.tripCategory,
            }));

            setTravelList((prev) =>
                reset ? mappedTravels : [...prev, ...mappedTravels]
            );
            setHasNext(nextExists);

            if (!reset)
                pageRef.current += 1; // 다음 페이지 준비
            else pageRef.current = 1; // reset이면 1부터 시작
            console.log('페이지 증가 후 pageRef.current:', pageRef.current);
        } catch (error) {
            console.error('여행 목록 불러오기 실패:', error);
        } finally {
            isFetchingRef.current = false;
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        fetchTravels(true); // 첫 렌더 시 reset
    }, [fetchTravels]);

    // 마지막 요소에 ref 연결
    const lastTravelRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNext &&
                    !isFetchingRef.current
                ) {
                    fetchTravels(false); // reset=false
                }
            });

            if (node) observer.current.observe(node);
        },
        [hasNext, fetchTravels]
    );

    // 모달 열기
    const openDeleteModal = (id: number) => {
        setTargetTravelId(id);
        setModalType('deleteTravel');
        setIsModalOpen(true);
    };

    const openNewTravelModal = () => {
        setModalType('newTravel');
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (!targetTravelId) return;
        console.log(`여행 ${targetTravelId} 삭제`);
        // 모달 닫기 먼저
        setIsModalOpen(false);
        try {
            await api.delete(`/trips/${targetTravelId}`);

            setTravelList([]);
            pageRef.current = 0;
            setHasNext(true);
            fetchTravels(true);
        } catch (error) {
            console.warn('여행 삭제 실패', error);
        } finally {
            setTargetTravelId(null);
            setModalType(null);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="pt-7">
                <MainTabButton />
            </div>
            <div>
                <div className="mb-1 flex cursor-pointer justify-end">
                    <button
                        className="text-caption text-[#585858]"
                        onClick={() => setIsEditMode((prev) => !prev)}
                    >
                        {isEditMode ? '완료' : '편집'}
                    </button>
                </div>
                <div className="flex cursor-pointer flex-col gap-4">
                    <button
                        onClick={() => openNewTravelModal()}
                        className="bg-plus-background text-text-sub flex w-full justify-center rounded-xl border py-6"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 5V19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <div className="mx-[-20px] flex max-h-[53vh] flex-col gap-3 overflow-y-auto pb-6">
                        {travelList.map((travel, index) => {
                            const isLast = index === travelList.length - 1;
                            return (
                                <div
                                    key={travel.id}
                                    ref={isLast ? lastTravelRef : null}
                                >
                                    <MainCardButton
                                        travel={travel}
                                        isEditMode={isEditMode}
                                        onClick={() => {
                                            if (isEditMode) return;
                                            navigate(`/trip/${travel.id}`);
                                        }}
                                        onDelete={() =>
                                            openDeleteModal(travel.id)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={
                    modalType === 'newTravel'
                        ? () => {
                              setIsModalOpen(false);
                              navigate('/set-travel-type');
                          }
                        : handleDelete
                }
                title={
                    modalType === 'newTravel' ? (
                        <div className="text-subtitle text-secondary flex flex-col items-center px-8 text-center font-semibold">
                            새로운 여행을 시작하시겠습니까?
                        </div>
                    ) : (
                        <div className="text-subtitle text-secondary flex flex-col items-center px-8 text-center font-semibold">
                            여행을 삭제하시겠습니까?
                        </div>
                    )
                }
                children={
                    <div>
                        {modalType === 'newTravel' ? (
                            <div>
                                스터디트립과 함께 새로운 여행을 시작해보아요!
                            </div>
                        ) : (
                            <div>
                                여행에 등록된 모든 일정과 미션이 삭제됩니다.
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
};

export default MainPage;

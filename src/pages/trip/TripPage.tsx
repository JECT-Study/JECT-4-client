import { lazy, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '@lib/axios';
import BackHeader from '@components/common/BackHeaderLayout';
import useTripDetail from '@hooks/trip/useTripDetail';

const GoalStep = lazy(() => import('./_components/GoalStep'));

type Align = 'left' | 'right' | 'center';
type GoalState = 'complete' | 'goal' | 'enable';

const TripPage = () => {
    const navigate = useNavigate();

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

    const { data, isError } = useTripDetail(tripId);
    const [isCompletingTrip, setIsCompletingTrip] = useState(false);
    const hasAlertshown = useRef(false);

    useEffect(() => {
        if (!data?.stamps || isCompletingTrip || hasAlertshown.current) return;

        const allCompleted = data.stamps.every((stamp) => stamp.completed);

        if (allCompleted && !data.completed) {
            hasAlertshown.current = true;
            setIsCompletingTrip(true);
            alert('모든 스탬프가 완료되었습니다. 여행 리포트를 작성해주세요.');

            const completeTrip = async () => {
                try {
                    await api.patch(`/trips/${data.tripId}/complete`);
                    navigate(`/add-history/${tripId}`);
                } catch (error) {
                    console.error('여행 완료 API 호출 실패:', error);
                    hasAlertshown.current = false;
                } finally {
                    setIsCompletingTrip(false);
                }
            };

            completeTrip();
        }
    }, [data, tripId, navigate, isCompletingTrip]);

    const steps = useMemo(() => {
        if (!data) return [];

        // 현재 목표 (완료되지 않은 목표 중 첫 번째 목표 선택)
        const goalStep = data.stamps.findIndex((stamp) => !stamp.completed);

        // 인덱스에 따른 목표 방향 반환 (center | left | right)
        const getAlign = (index: number): Align => {
            if (index === 0) return 'center';
            return index % 2 ? 'left' : 'right';
        };

        // 방향에 따른 line 흐름 반환 (flipped | normal)
        const getPathDirection = (align: Align) => {
            return align === 'right' ? 'flipped' : 'normal';
        };

        // 위치별 상태 반환 (complete | goal | enable)
        const getGoalState = (
            stampCompleted: boolean,
            index: number
        ): GoalState => {
            if (stampCompleted) return 'complete';
            if (index === goalStep || (goalStep === -1 && index === 0)) {
                return 'goal';
            }

            return 'enable';
        };

        return data.stamps.map((stamp, index) => {
            const align = getAlign(index);
            const goalState = getGoalState(stamp.completed, index);

            return {
                sequence: String(stamp.stampOrder),
                title: stamp.stampName,
                align,
                pathDirection: getPathDirection(align),
                goalState,
                isLast: index === data.stamps.length - 1,
                onNavigate:
                    goalState !== 'enable'
                        ? () => {
                              navigate(
                                  `/trip/${tripId}/dashboard?stampId=${stamp.stampId}`
                              );
                          }
                        : undefined,
            } as const;
        });
    }, [data]);

    const handleBack = () => {
        navigate(`/main`);
    };

    /* alert 사이드 이펙트 방지를 위해 추후 오류 UI 반환 필요 */
    if (isError) alert('여행 정보를 불러오지 못했어요.');

    return (
        <div className="flex flex-col">
            {/* 상단 헤더 */}
            <div className="h-[4rem]">
                <BackHeader
                    title={data?.name}
                    hideLogButton={false}
                    hideEditButton={false}
                    onBack={handleBack}
                />
            </div>
            <div className="m-auto h-[calc(100vh-10rem)] max-w-[22rem] min-w-[15rem] overflow-y-auto pt-[8rem] [&::-webkit-scrollbar]:hidden">
                {steps.map((step) => (
                    <GoalStep
                        key={`${data?.tripId}-${step.sequence}`}
                        {...step}
                    />
                ))}
            </div>
        </div>
    );
};

export default TripPage;

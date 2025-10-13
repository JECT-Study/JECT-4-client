import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackHeader from '../../../components/common/BackHeaderLayout';

import BxCalendarIcon from '../../../assets/icons/bx_calendar.svg?react';
import EditIcon from '../../../assets/icons/edit.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import Button from './_components/Button';
import ProgressBar from './_components/ProgressBar';
import TripCard from './_components/TripCard';
import useTripDetail from '../../../hooks/trip/useTripDetail';
import usePatchTrip from '../../../hooks/trip/usePatchTrip';
import useValidatedTripId from '../../../hooks/common/useValidateTripId';

const StampSettingPage = () => {
    const navigate = useNavigate();
    const tripId = useValidatedTripId();
    const [isEditingMode, setIsEditingMode] = useState(false);

    if (!tripId) return null;

    const {
        data: tripData,
        isLoading,
        isError,
        refetch,
    } = useTripDetail(tripId);

    const { mutatePatchTrip } = usePatchTrip({
        onSuccess: () => {
            setIsEditingMode(false);
            refetch();
        },
    });

    const handleEditModeToggle = () => {
        setIsEditingMode((prev) => !prev);
    };

    const handleTripNameEdited = (newName: string, newEndDate: string) => {
        if (!tripData) return;

        const requestBody = {
            name: newName,
            memo: tripData.memo,
            category: tripData.category,
            endDate: newEndDate,
        };

        mutatePatchTrip({ tripId, data: requestBody });
    };

    if (isLoading) return <div>로딩 중입니다......</div>;

    if (isError) return null;
    if (!tripData) return null;

    return (
        <div className="flex flex-col gap-3">
            <div className="h-[4rem]">
                <BackHeader title="여행 / 스탬프 설정" />
            </div>
            <section className="flex flex-col gap-1">
                <p className="text-text-sub text-body">나의 여행</p>
                <TripCard
                    trip={tripData}
                    isEditing={isEditingMode}
                    onSave={handleTripNameEdited}
                    onEditModeToggle={handleEditModeToggle}
                />
            </section>
            <section className="flex flex-col gap-2 pt-3">
                <p className="text-text-sub text-body">나의 스탬프</p>
                <div>
                    <article className="flex flex-col gap-2 rounded-xl bg-white px-5 py-[0.6875rem] shadow-[0_6px_18px_0_rgba(0,0,0,0.08)]">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <h5 className="text-text-sub text-body font-medium">
                                        오답 분석 및 정리
                                    </h5>
                                    <div className="flex items-center justify-center rounded-b-md bg-[#F8F7F5] px-2 py-[0.0625rem]">
                                        <span className="text-text-sub text-caption">
                                            진행 중
                                        </span>
                                    </div>
                                </div>
                                <button className="cursor-pointer">
                                    <EditIcon className="fill-[#EEE7D8]" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1">
                                <BxCalendarIcon className="ml-[-0.05rem]" />
                                <p className="text-text-sub text-caption">
                                    2025. 07. 12
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <ProgressBar
                                completedLength={1}
                                progressLength={5}
                            />
                            <Button
                                isCompleted={true}
                                onClick={() => console.log('임시')}
                            />
                        </div>
                    </article>
                </div>
            </section>
            <div className="pt-5">
                <button
                    className="text-secondary flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#EEE7D8] px-4 py-8"
                    onClick={() => navigate(`/trip/${tripId}/setting/add`)}
                >
                    <PlusIcon />
                </button>
            </div>
        </div>
    );
};

export default StampSettingPage;

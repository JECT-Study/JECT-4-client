import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackHeader from '@components/common/BackHeaderLayout';
import TripCard from './_components/TripCard';
import StampCard from './_components/StampCard';

import useTripDetail from '@hooks/trip/useTripDetail';
import usePatchTrip from '@hooks/trip/usePatchTrip';
import useValidatedTripId from '@hooks/common/useValidateTripId';

import PlusIcon from '@assets/icons/plus.svg?react';

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
            <header className="h-[4rem]">
                <BackHeader title="여행 / 스탬프 설정" />
            </header>
            <section className="flex flex-col gap-1">
                <p className="text-text-sub text-body">나의 여행</p>
                <TripCard
                    trip={tripData}
                    isEditing={isEditingMode}
                    onSave={handleTripNameEdited}
                    onEditModeToggle={handleEditModeToggle}
                />
            </section>
            <section className="pt-3">
                <p className="text-text-sub text-body">나의 스탬프</p>
                <div className="flex h-[calc(100vh-23rem)] flex-col gap-2 overflow-auto pt-3 [&::-webkit-scrollbar]:hidden">
                    {tripData.stamps.map((stamp) => (
                        <StampCard stamp={stamp} key={stamp.stampId} />
                    ))}
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

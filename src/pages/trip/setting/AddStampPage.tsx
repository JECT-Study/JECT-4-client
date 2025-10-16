import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MainButton from '@components/common/button/MainButton';
import BackHeader from '@components/common/BackHeaderLayout';
import useCreateStamp from '@hooks/stamp/useCreateStamp';

// import Calendar from './_components/Calendar';

const AddStampPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [currentTripId, setCurrentTripId] = useState<number | null>(null);
    const [currentStampOrder, setCurrentStampOrder] = useState<number | null>(
        null
    );

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const { mutateCreateStamp } = useCreateStamp();

    useEffect(() => {
        const state = location.state as {
            tripId?: number;
            stmapOrder?: number;
        } | null;

        if (
            state &&
            typeof state.tripId === 'number' &&
            typeof state.stmapOrder === 'number'
        ) {
            setCurrentTripId(state.tripId);
            setCurrentStampOrder(state.stmapOrder);
        } else {
            alert('스탬프 정보를 불러올 수 없습니다. 다시 시도해주세요.');
            navigate(-1);
        }
    }, [location.state, navigate]);

    const handleSaveStamp = () => {
        if (currentTripId === null || currentStampOrder === null) {
            alert('필요한 스탬프 정보가 입력되지 않았습니다.');
            navigate(-1);

            return;
        }

        if (!name.trim()) {
            alert('스탬프 이름을 입력해주세요.');
            return;
        }

        const requestBody = {
            name: name,
            order: currentStampOrder,
        };

        mutateCreateStamp({ tripId: currentTripId, body: requestBody });

        navigate(-1);
    };

    const isSaveButtonDisabled =
        !name.trim() || currentTripId === null || currentStampOrder === null;

    return (
        <div className="flex flex-col gap-3">
            <div className="h-[4rem]">
                <BackHeader title="스탬프 추가" />
            </div>
            <section className="flex flex-col gap-2">
                <span className="text-body text-text-min">스탬프 이름</span>
                <input
                    id="stamp-name"
                    value={name}
                    className="border-input-sub placeholder:text-subtitle focus:outline-input-sub h-[3.1875rem] rounded-md border bg-[#F8F7F5] px-4 py-3 placeholder:text-[rgba(117,117,117,0.40)] focus:bg-white"
                    placeholder="문제 유형 파악"
                    onChange={handleChangeName}
                />
            </section>
            {/* <section className="flex flex-col gap-2 pt-6">
                <span className="text-body text-text-min">마감일</span>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="accent-text-sub h-[1.375rem] w-[1.375rem]"
                    />
                    <p className="text-text-min text-body">마감일 없음</p>
                </div>
            </section>
            <section className="flex flex-col gap-3 pt-5">
                <div>
                    <p className="text-text-min text-body">
                        날짜를 선택해 주세요
                    </p>
                    <p className="text-point1 text-small">
                        *여행 기간 내에서만 마감일을 설정할 수 있어요.
                    </p>
                </div>
                <Calendar
                    startDate="2025-10-02"
                    onSelectDate={() => console.log('임시')}
                />
            </section> */}
            <div className="pt-3">
                <MainButton
                    onClick={handleSaveStamp}
                    colorClass="bg-text-sub"
                    disabled={isSaveButtonDisabled}
                >
                    저장
                </MainButton>
            </div>
        </div>
    );
};

export default AddStampPage;

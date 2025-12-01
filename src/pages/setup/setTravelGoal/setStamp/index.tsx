import { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

import Modal from './StampModal';
import BackHeader from '@components/common/BackHeaderLayout';
import MainButton from '@components/common/button/MainButton';
import MissionList from './MissionList';

const SetStampCard = lazy(() => import('./SetStampCard'));

import api from '@lib/axios';

import { travelInfoAtom } from '@store/travelInfoAtom';
import type { Stamp } from '@store/travelInfoAtom';

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

const SetStampLinearPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const isNextDisabled = false;
    const [isOpen, setIsOpen] = useState(false);
    const setTravelInfo = useSetAtom(travelInfoAtom);
    const prevTravelInfo = useAtomValue(travelInfoAtom);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const today = new Date();

    const filteredMissions = items
        .filter((item) => item.text.trim() !== '')
        .map((item) => item.text);

    const handleConfirm = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const stamps: Stamp[] = filteredMissions.map((text, index) => ({
            name: text,
            order: index + 1,
        }));

        const travelInfo = { ...prevTravelInfo, stamps: stamps };

        setTravelInfo(() => ({
            ...prevTravelInfo,
            stamps, // 기존 stamps 대신 현재 items로 업데이트
        }));

        try {
            await api.post('/trips', travelInfo);

            navigate('/main', { replace: true });
        } catch (error) {
            console.error('API 호출 실패:', error);
            alert('서버 요청 중 오류가 발생했습니다.');
        } finally {
            setIsOpen(false);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <BackHeader />
            <section className="mb-12 rounded-lg pt-16 pb-5">
                <h1 className="text-title text-secondary">
                    여행의 여정을 구성해보세요.
                    <br />
                    목표를 순서대로 입력해 주세요.
                </h1>
                <p className="text-small text-text-min pt-1">
                    계획 된 순서와 단계에 따라 진행하는 목표입니다.
                </p>
                <div className="mt-12">
                    <SetStampCard items={items} setItems={setItems} />
                </div>
            </section>
            <section className="py-5">
                <MainButton
                    disabled={isNextDisabled}
                    onClick={() => setIsOpen(true)}
                ></MainButton>
            </section>
            <Modal
                stampName={prevTravelInfo.name}
                startDate={
                    today ? format(today, 'yyyy. MM. dd', { locale: ko }) : ''
                }
                endDate={
                    prevTravelInfo.endDate
                        ? format(
                              parse(
                                  prevTravelInfo.endDate,
                                  'yyyy-MM-dd',
                                  new Date()
                              ),
                              'yyyy. MM. dd',
                              { locale: ko }
                          )
                        : ''
                }
                isOpen={isOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}
            >
                <MissionList missions={filteredMissions} />
            </Modal>
        </div>
    );
};

export default SetStampLinearPage;

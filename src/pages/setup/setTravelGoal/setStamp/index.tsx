import { useState } from 'react';
import Modal from './StampModal';
import BackHeader from '../../../../components/common/BackHeaderLayout';
import MainButton from '../../../../components/common/button/MainButton';
import SetStampCard from './SetStampCard';
import MissionList from './MissionList';

interface Item {
    id: string;
    text: string;
    isEditing: boolean;
}

const SetStampLinearPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const isNextDisabled = false;
    const [isOpen, setIsOpen] = useState(false);

    const filteredMissions = items
        .filter((item) => item.text.trim() !== '')
        .map((item) => item.text);

    const handleConfirm = () => {
        console.log('확인 클릭됨');
        setIsOpen(false);
    };

    const handleCancel = () => {
        console.log('취소 클릭됨');
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

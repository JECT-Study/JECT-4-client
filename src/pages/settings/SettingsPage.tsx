import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArrowIcon from '../../assets/icons/arrow.svg?react';
import StatCard from './StatCard';
import SettingList from './SettingList';
import ConfirmModal from '../../components/common/ConfirmModal';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

const stats = [
    { label: '탐험형', count: 8 },
    { label: '코스형', count: 8 },
    { label: '기록', count: 8 },
];

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

    const handleLogout = async () => {
        setIsModalOpen(false);
        try {
            const response = await axios.post('/api/auth/logout', {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
            });

            console.log('로그아웃 성공');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('loginCheck', 'false');
            navigate('/', { replace: true });
        } catch (error) {
            console.warn('로그아웃 실패', error);
        }
    };

    return (
        <div>
            <div className="bg-secondary absolute inset-x-0 h-72 w-full"></div>
            <div className="relative z-10 flex w-full justify-between py-24 text-white">
                <div>
                    <div className="text-title mb-3">
                        {userName}님,
                        <br />
                        안녕하세요.
                    </div>
                    <button
                        onClick={() => navigate('/settings/user')}
                        className="text-small flex cursor-pointer items-center gap-2 opacity-50"
                    >
                        회원정보 수정
                        <ArrowIcon className="text-white" />
                    </button>
                </div>
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white opacity-0">
                    프로필
                </div>
            </div>
            <StatCard stats={stats} />
            <SettingList />
            <div className="-mx-5 my-1.5 h-2 w-screen bg-[#F4EDDE]"></div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-secondary flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-5"
            >
                <div className="text-point1">로그아웃</div>
            </button>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleLogout}
                title={
                    <div className="text-subtitle text-secondary flex flex-col items-center px-8 text-center font-semibold">
                        로그아웃 하시겠습니까?
                    </div>
                }
            />
        </div>
    );
};

export default SettingsPage;

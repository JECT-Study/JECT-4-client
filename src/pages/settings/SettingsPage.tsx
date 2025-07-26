import { useNavigate } from 'react-router';
import ArrowIcon from '../../assets/icons/arrow.svg?react';
import StatCard from './StatCard';
import SettingList from './SettingList';

const stats = [
    { label: '탐험형', count: 8 },
    { label: '코스형', count: 8 },
    { label: '기록', count: 8 },
];

const SettingsPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="bg-secondary absolute inset-x-0 h-72 w-full"></div>
            <div className="relative z-10 flex w-full justify-between py-24 text-white">
                <div>
                    <div className="text-title mb-3">
                        ㅇㅇ님,
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
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white">
                    프로필
                </div>
            </div>
            <StatCard stats={stats} />
            <SettingList />
            <div className="-mx-5 my-1.5 h-2 w-screen bg-[#F4EDDE]"></div>
            <button
                onClick={() => console.log('알림 설정 클릭')}
                className="text-secondary flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-5"
            >
                <div className="text-point1">로그아웃</div>
            </button>
        </div>
    );
};

export default SettingsPage;

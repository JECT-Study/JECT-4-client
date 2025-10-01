import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router';
import SettingItem from './SettingItem';

const SettingList = () => {
    const navigate = useNavigate();
    const settings = [
        {
            label: '알림설정',
            onClick: () =>
                toast('아직 준비 중인 기능입니다.', {
                    closeButton: false,
                    autoClose: 1000,
                    hideProgressBar: true,
                    position: 'top-center',
                }),
        },
        {
            label: '공지사항',
            onClick: () =>
                toast('아직 준비 중인 기능입니다.', {
                    closeButton: false,
                    autoClose: 1000,
                    hideProgressBar: true,
                    position: 'top-center',
                }),
        },
        {
            label: '앱 정보',
            onClick: () =>
                toast('아직 준비 중인 기능입니다.', {
                    closeButton: false,
                    autoClose: 1000,
                    hideProgressBar: true,
                    position: 'top-center',
                }),
        },
        { label: '회원 탈퇴', onClick: () => navigate('/settings/withdrawal') },
    ];

    return (
        <div className="flex flex-col">
            {settings.map((item) => (
                <SettingItem label={item.label} onClick={item.onClick} />
            ))}
            <ToastContainer />
        </div>
    );
};

export default SettingList;

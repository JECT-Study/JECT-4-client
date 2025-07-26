import ArrowIcon from '../../assets/icons/arrow.svg?react';
import SettingItem from './SettingItem';

const settings = [
    { label: '알림설정', onClick: () => console.log('알림 설정 클릭') },
    { label: '공지사항', onClick: () => console.log('공지사항 클릭') },
    { label: '앱 정보', onClick: () => console.log('앱 정보 클릭') },
    { label: '회원 탈퇴', onClick: () => console.log('회원 탈퇴 클릭') },
];

const SettingList = () => {
    return (
        <div>
            {settings.map((item, index) => (
                <SettingItem label={item.label} onClick={item.onClick} />
            ))}
        </div>
    );
};

export default SettingList;

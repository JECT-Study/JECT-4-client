import { useLocation, useNavigate, Outlet } from 'react-router';
import ListIcon from '../assets/icons/list.svg?react';
import HomeIcon from '../assets/icons/home.svg?react';
import SettingIcon from '../assets/icons/setting.svg?react';
import { toast, ToastContainer } from 'react-toastify';

const navItems = [
    { path: '/list', label: '기록', Icon: ListIcon },
    { path: '/main', label: '홈', Icon: HomeIcon },
    { path: '/settings', label: '설정', Icon: SettingIcon },
];

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;
    return (
        <div>
            <div>
                <Outlet />
            </div>
            <ToastContainer />
            <div className="text-caption bg-background absolute inset-x-0 bottom-0 mb-6 flex h-14 w-full items-center justify-around border-t border-gray-300/70">
                {navItems.map(({ path, label, Icon }) => {
                    const isActive = currentPath === path;
                    const textClass = isActive
                        ? 'text-secondary font-semibold'
                        : 'text-footer-unselected';

                    return (
                        <button
                            key={path}
                            className={`flex w-full cursor-pointer flex-col items-center gap-1 ${textClass}`}
                            onClick={() =>
                                label === '기록'
                                    ? toast('아직 준비 중인 기능입니다.', {
                                          closeButton: false,
                                          autoClose: 1000,
                                          hideProgressBar: true,
                                          position: 'top-center',
                                      })
                                    : navigate(path)
                            }
                        >
                            <Icon />
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MainLayout;

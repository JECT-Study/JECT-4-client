import { Routes, Route, Navigate } from 'react-router';

import BasicLayout from './components/BasicLayout';

import LoginPage from './pages/auth/LoginPage/KakaoLoginPage';
import LoginAccessPage from './pages/auth/LoginPage/KakaoLoginAccessPage';
import SetNamePage from './pages/setup/setProfile/SetNamePage';
import SetJobPage from './pages/setup/setProfile/SetJobPage';

import MainLayout from './components/MainLayout';
import MainPage from './pages/dashboard/MainPage';
import StyleGuide from './pages/style-guide/StyleGuide';

import SetTravelTypePage from './pages/setup/setTravelGoal/setTravelType/index';
import SetTravelNamePage from './pages/setup/setTravelGoal/setTravelName';
import SetStampLinearPage from './pages/setup/setTravelGoal/setStamp';
import SettingsPage from './pages/settings/SettingsPage';
import UserPage from './pages/settings/UserPage';
import WithdrawalPage from './pages/settings/WithdrawalPage';

const Router = () => {
    return (
        <Routes>
            <Route element={<BasicLayout />}>
                {/* 로그인 화면 */}
                <Route path="/" element={<LoginPage />} />
                {/* 온보딩, 셋업 페이지 */}
                <Route
                    path="/auth/callback/kakao"
                    element={<LoginAccessPage />}
                />
                <Route path="/set-name" element={<SetNamePage />} />
                <Route path="/set-job" element={<SetJobPage />} />

                {/* 여행 생성 도메인 */}
                <Route
                    path="/set-travel-type"
                    element={<SetTravelTypePage />}
                />
                <Route
                    path="/set-travel-name"
                    element={<SetTravelNamePage />}
                />

                <Route
                    path="/set-stamp-linear"
                    element={<SetStampLinearPage />}
                />

                {/* 스타일 가이드 페이지 */}
                <Route path="/style-guide" element={<StyleGuide />} />

                {/* 메인 서비스 : 푸터 있는 페이지들 */}
                <Route element={<MainLayout />}>
                    {/* 메인 페이지 */}
                    <Route path="/main" element={<MainPage />} />
                    {/* 세팅 페이지 */}
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
                {/* 세팅 내부 페이지들 */}
                <Route path="/settings/user" element={<UserPage />} />
                <Route
                    path="/settings/withdrawal"
                    element={<WithdrawalPage />}
                />

                {/* 404 처리 : 메인 페이지 리다이렉트 (임시) */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default Router;

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

import BasicLayout from './components/BasicLayout';
import MainLayout from './components/MainLayout';
import Loading from './components/common/Loading';
import PrivateRoute from './routes/PrivateRoutes';

// 로그인/회원 가입 페이지
const LoginPage = lazy(() => import('./pages/auth/LoginPage/KakaoLoginPage'));
const LoginAccessPage = lazy(
    () => import('./pages/auth/LoginPage/KakaoLoginAccessPage')
);
const SetNamePage = lazy(() => import('./pages/setup/setProfile/SetNamePage'));
const SetJobPage = lazy(() => import('./pages/setup/setProfile/SetJobPage'));

// 메인 페이지
const MainPage = lazy(() => import('./pages/dashboard/MainPage'));

// 여행/스탬프 로드맵 생성 페이지
const SetTravelTypePage = lazy(
    () => import('./pages/setup/setTravelGoal/setTravelType/index')
);
const SetTravelNamePage = lazy(
    () => import('./pages/setup/setTravelGoal/setTravelName')
);
const SetStampLinearPage = lazy(
    () => import('./pages/setup/setTravelGoal/setStamp')
);

// 유저 관련 페이지 (정보/탈퇴)
const UserPage = lazy(() => import('./pages/settings/UserPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const WithdrawalPage = lazy(() => import('./pages/settings/WithdrawalPage'));

// 학습 관련 페이지 (뽀모도로/학습 로그)
const PomodoroPage = lazy(() => import('./pages/pomodoro/PomodoroPage'));
const LogPage = lazy(() => import('./pages/pomodoro/log/LogPage'));
const LogListPage = lazy(() => import('./pages/log/LogListPage'));

// 스탬프 페이지 (선형 스탬프/스탬프 관리/대시보드)
const TripPage = lazy(() => import('./pages/trip/TripPage'));
const StampSettingPage = lazy(
    () => import('./pages/trip/setting/StampSettingPage')
);
const AddStampPage = lazy(() => import('./pages/trip/setting/AddStampPage'));
const DashboardPage = lazy(
    () => import('./pages/trip/dashboard/DashboardPage')
);

// 공부 히스토리 페이지
const AddHistoryPage = lazy(() => import('./pages/add-history/AddHistoryPage'));
const MyHistoryPage = lazy(() => import('./pages/history/MyHistoryPage'));
const HistoryPage = lazy(() => import('./pages/history/[id]/HistoryPage'));

const Router = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<BasicLayout />}>
                    {/* 모든 사용자 접근 가능 */}
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/auth/callback/kakao"
                        element={<LoginAccessPage />}
                    />

                    {/* 인가 사용자 접근 가능 */}
                    <Route element={<PrivateRoute />}>
                        {/* 온보딩, 셋업 페이지 */}
                        <Route path="/set-name" element={<SetNamePage />} />
                        <Route path="/set-job" element={<SetJobPage />} />
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

                        {/* 메인 서비스 (MainLayout 포함) */}
                        <Route element={<MainLayout />}>
                            <Route path="/main" element={<MainPage />} />
                            <Route
                                path="/settings"
                                element={<SettingsPage />}
                            />
                            <Route
                                path="/trip/:tripId"
                                element={<TripPage />}
                            />
                            <Route
                                path="/history"
                                element={<MyHistoryPage />}
                            />
                        </Route>

                        {/* 세팅 내부 페이지들 */}
                        <Route path="/settings/user" element={<UserPage />} />
                        <Route
                            path="/settings/withdrawal"
                            element={<WithdrawalPage />}
                        />

                        {/* 뽀모도로 타이머 페이지 */}
                        <Route path="/pomodoro" element={<PomodoroPage />} />

                        {/* 학습 후 학습 로그 페이지 */}
                        <Route path="/log" element={<LogPage />} />

                        {/* 공부 기록 페이지 (LOG-02) */}
                        <Route path="/log/:tripId" element={<LogListPage />} />

                        {/* 여행 대시보드 페이지 */}
                        <Route
                            path="/trip/:tripId/dashboard"
                            element={<DashboardPage />}
                        />

                        {/* 스탬프 설정 페이지 (ST) */}
                        <Route
                            path="/trip/:tripId/setting"
                            element={<StampSettingPage />}
                        />
                        <Route
                            path="/trip/:tripId/setting/add"
                            element={<AddStampPage />}
                        />

                        {/* 여행 기록 페이지 (TR-01.1) */}
                        <Route
                            path="/history/:tripReportId"
                            element={<HistoryPage />}
                        />

                        {/* 여행 완료 후 여행 기록 입력 페이지 (TR-02) */}
                        <Route
                            path="/add-history/:tripId"
                            element={<AddHistoryPage />}
                        />
                    </Route>
                </Route>

                {/* 404 처리 */}
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
        </Suspense>
    );
};

export default Router;

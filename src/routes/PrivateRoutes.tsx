import { lazy } from 'react';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import useAuthInitialization from '@hooks/token/useAuthInitialization';
import { sessionStorageAtom } from '@store/auth';

import useTokenAutoRefresh from '@hooks/token/useTokenAutoRefresh';

const FallbackLoading = lazy(
    () => import('@components/common/FallbackLoading')
);

export default function PrivateRoute() {
    const { authReady } = useAuthInitialization();
    const token = useAtomValue(sessionStorageAtom);

    useTokenAutoRefresh(token);

    if (!authReady) return <FallbackLoading />;
    if (!token) return <Navigate to="/" replace />;

    return <Outlet />;
}

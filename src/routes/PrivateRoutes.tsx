import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import useAuthInitialization from '@hooks/token/useAuthInitialization';
import { sessionStorageAtom } from '@store/auth';
import Loading from '@components/common/Loading';
import useTokenAutoRefresh from '@hooks/token/useTokenAutoRefresh';

export default function PrivateRoute() {
    const { authReady } = useAuthInitialization();
    const token = useAtomValue(sessionStorageAtom);

    useTokenAutoRefresh(token);

    if (!authReady) return <Loading />;
    if (!token) return <Navigate to="/" replace />;

    return <Outlet />;
}

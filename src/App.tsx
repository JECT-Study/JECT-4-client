import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getDefaultStore } from 'jotai';

import { sessionStorageAtom } from '@store/auth';
import Router from './routes';
import Loading from './components/common/Loading';
import useTokenAutoRefresh from './hooks/token/useTokenAutoRefresh';
import useAuthInitialization from './hooks/token/useAuthInitialization';

/**
 * 메인 App 컴포넌트
 */
function App() {
    const store = getDefaultStore();

    const { authReady } = useAuthInitialization();
    const { scheduleTokenRefresh } = useTokenAutoRefresh();

    useEffect(() => {
        const unsubscribe = store.sub(sessionStorageAtom, () => {
            const newToken = store.get(sessionStorageAtom);

            if (newToken) scheduleTokenRefresh(newToken);
        });

        return () => {
            unsubscribe();
        };
    }, [scheduleTokenRefresh]);

    if (!authReady) return <Loading />;

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;

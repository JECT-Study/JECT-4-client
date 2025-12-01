import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router';

import api from '@lib/axios';
import { AxiosError } from 'axios';

import Loading from '@components/common/Loading';

import { sessionStorageAtom } from '@store/auth';
import { signupUserInfoAtom } from '@store/signupUserInfoAtom';

function KakaoLoginAccessPage() {
    const navigate = useNavigate();
    const didLogin = useRef(false);
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const [, setUserInfo] = useAtom(signupUserInfoAtom);
    const [, setAccessToken] = useAtom(sessionStorageAtom);

    // code가 있을 경우 1. 로그인 시도 2. 로그인 실패할 시 userInfoAtom에 저장하고 이름 설정 페이지로 이동
    useEffect(() => {
        if (didLogin.current) return;
        didLogin.current = true;

        if (!code) {
            alert('로그인 실패: 인증 코드가 없습니다.');
            navigate('/', { replace: true });
            return;
        }

        const login = async () => {
            try {
                const response = await api.post('/auth/login/kakao', {
                    code,
                });

                if (response.data.data.signupRequired) {
                    navigate('/set-name', { replace: true });
                } else {
                    // 로그인 성공 시 토큰 저장 후 메인 페이지 이동
                    setAccessToken(response.data.data.accessToken);
                    navigate('/main', { replace: true });
                }
            } catch (error) {
                const err = error as AxiosError;
                alert('로그인에 문제가 발생했습니다. ' + err.message);
                navigate('/', { replace: true });
            }
        };

        login();
    }, [code, navigate, setUserInfo]);

    return <Loading />;
}

export default KakaoLoginAccessPage;

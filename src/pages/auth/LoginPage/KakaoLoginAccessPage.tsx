import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useRef } from 'react';
import { AxiosError } from 'axios';

import api from '@lib/axios';
import { useAtom } from 'jotai';
import { accessTokenAtom } from '@store/auth';
import { signupUserInfoAtom } from '@store/signupUserInfoAtom';

function KakaoLoginAccessPage() {
    const navigate = useNavigate();
    const didLogin = useRef(false);
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const [, setUserInfo] = useAtom(signupUserInfoAtom);
    const [, setAccessToken] = useAtom(accessTokenAtom);

    const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const K_REDIRECT_URI = window.location.origin + '/auth/callback/kakao';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&scope=profile_image,account_email`;

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

                // 로그인 성공 시 토큰 저장 후 메인 페이지 이동
                setAccessToken(response.data.data.accessToken);

                console.log('로그인 성공');

                debugger;
                navigate('/main', { replace: true });
            } catch (error) {
                const err = error as AxiosError;
                if (err.response?.status === 409) {
                    console.warn('로그인 실패, 신규 회원 처리', error);

                    navigate('/set-name', { replace: true });
                } else {
                    debugger;
                    alert('로그인에 문제가 발생했습니다. ' + err.message);
                    navigate('/', { replace: true });
                }
            }
        };

        login();
    }, [code, navigate, setUserInfo]);

    return <div>로그인 중입니다..</div>;
}

export default KakaoLoginAccessPage;

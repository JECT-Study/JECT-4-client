import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import api from '@lib/axios';
import { useAtom } from 'jotai';
import { signupUserInfoAtom } from '../../../store/signupUserInfoAtom';

function KakaoLoginAccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const [, setUserInfo] = useAtom(signupUserInfoAtom);

    const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const K_REDIRECT_URI = window.location.origin + '/auth/callback/kakao';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&scope=profile_image,account_email`;

    // code가 있을 경우 1. 로그인 시도 2. 로그인 실패할 시 userInfoAtom에 저장하고 이름 설정 페이지로 이동
    useEffect(() => {
        if (code === null) {
            alert('로그인 실패: 인증 코드가 없습니다.');
            navigate('/', { replace: true });
            return;
        }

        const login = async () => {
            // 로그인 api 호출 여부 확인
            if (localStorage.getItem('loginCheck') !== 'true') {
                try {
                    const response = await api.post('/auth/login/kakao', {
                        code,
                    });

                    // 로그인 성공 시 토큰 저장 후 메인 페이지 이동
                    localStorage.setItem(
                        'accessToken',
                        response.data.data.accessToken
                    );
                    localStorage.setItem(
                        'refreshToken',
                        response.data.data.refreshToken
                    );

                    console.log('로그인 성공');

                    localStorage.setItem('loginCheck', 'false');
                    navigate('/main', { replace: true });
                } catch (error) {
                    const err = error as AxiosError;
                    if (err.response?.status === 409) {
                        console.warn('로그인 실패, 신규 회원 처리', error);

                        localStorage.setItem('loginCheck', 'true');
                        window.location.href = kakaoURL;
                    } else {
                        alert('로그인에 문제가 발생했습니다. ' + err.message);
                        navigate('/', { replace: true });
                    }
                }
            } else {
                // 새 code가 있으면 userInfo에 저장하고 /set-name으로 이동

                setUserInfo((prev) => ({
                    ...prev,
                    code,
                }));
                navigate('/set-name', { replace: true });
            }
        };

        login();
    }, [code, navigate, setUserInfo]);

    return null;
}

export default KakaoLoginAccessPage;

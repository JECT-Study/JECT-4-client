import kakaoLoginImage from '../../../assets/images/kakao_login.png';

const KakaoLoginButton = () => {
    const K_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    if (!K_REST_API_KEY) {
        console.error('카카오 REST API 키가 설정되지 않았습니다.');
        return null;
    }

    const K_REDIRECT_URI = window.location.origin + '/auth/callback/kakao';
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code&scope=profile_image,account_email`;

    const handleKakaoLogin = () => {
        try {
            window.location.href = kakaoURL;
        } catch (error) {
            console.error('카카오 로그인 리디렉션 중 오류 발생:', error);
        }
    };

    return (
        <button
            className="w-full cursor-pointer border-0 bg-white p-0"
            style={{ backgroundColor: 'white' }}
            aria-label="카카오 로그인"
            onClick={handleKakaoLogin}
        >
            <img
                src={kakaoLoginImage}
                alt="카카오 로그인"
                className="block h-auto w-full"
                loading="lazy"
            />
        </button>
    );
};

export default KakaoLoginButton;

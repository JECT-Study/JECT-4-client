import { lazy } from 'react';
import KakaoLoginButton from './KakaoLoginButton';

const OnboardingSwiper = lazy(() => import('./_components/OnboardingSwiper'));

const KakaoLoginPage = () => {
    return (
        <div className="mx-auto flex min-h-screen flex-col justify-between py-14">
            <section className="rounded-lg pb-15">
                <OnboardingSwiper />
            </section>
            <section className="absolute bottom-3 w-[calc(100%-40px)]">
                <KakaoLoginButton />
            </section>
        </div>
    );
};

export default KakaoLoginPage;

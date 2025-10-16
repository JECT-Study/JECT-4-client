import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import KakaoLoginButton from './KakaoLoginButton';
import OnBoarding1 from '../../../assets/images/onboarding1.png';
import OnBoarding2 from '../../../assets/images/onboarding2.png';
import OnBoarding3 from '../../../assets/images/onboarding3.png';
import OnBoarding4 from '../../../assets/images/onboarding4.png';

const KakaoLoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');

        if (code) {
            // console.log('Kakao OAuth Code:', code);
        }
    }, [navigate]);

    return (
        <div className="mx-auto flex min-h-screen flex-col justify-between py-14">
            <section className="rounded-lg pb-15">
                <Swiper
                    modules={[Scrollbar, Pagination, Autoplay]} // 페이지네이션, 자동재생 등의 기능을 불러옴
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    autoplay={{
                        // 자동 재생
                        delay: 4500, // 지연 시간 (한 슬라이더에 머물르는 시간)
                        disableOnInteraction: false, // 마우스 제어 이후 자동 재생을 막을지 말지
                    }}
                    speed={500} // 슬라이더 넘어가는 속도
                >
                    <SwiperSlide>
                        <h1 className="text-display text-secondary">
                            목표를 향한 하나의 여행
                        </h1>
                        <h1 className="text-display text-point2">
                            스터디 트립
                        </h1>
                        <p className="text-small text-text-min">
                            결과보다 과정을, 성취보다 성장의 가치를 발견해봐요
                        </p>
                        <div className="mt-7 px-9">
                            <img src={OnBoarding1} alt="Onboarding 1" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative">
                            <h1 className="text-display text-secondary">
                                스터디 유형 선택
                            </h1>
                            <p className="text-small text-text-min">
                                스터디트립과 함께할 나만의 학습 스타일을
                                골라주세요!
                            </p>
                            <div className="mt-17 px-9">
                                <img src={OnBoarding2} alt="Onboarding 2" />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <h1 className="text-display text-secondary">
                            학습 시작
                        </h1>
                        <p className="text-small text-text-min">
                            계획된 학습 일정에 따라 시간을 관리하고,
                            <br />
                            하나씩 완료해 나가요.
                        </p>
                        <div className="mt-11 px-9">
                            <img src={OnBoarding3} alt="Onboarding 3" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <h1 className="text-display text-secondary">
                            학습 일지 기록
                        </h1>
                        <p className="text-small text-text-min">
                            성취된 학습 내용, 집중 시간, 그리고 메모를
                            <br />
                            학습 일지 기록에서 바로 확인하고 성장 과정을
                            되돌아보세요!
                        </p>
                        <div className="mt-11 px-9">
                            <img src={OnBoarding4} alt="Onboarding 4" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
            <section className="absolute bottom-3 w-[calc(100%-40px)]">
                <KakaoLoginButton />
            </section>
        </div>
    );
};

export default KakaoLoginPage;

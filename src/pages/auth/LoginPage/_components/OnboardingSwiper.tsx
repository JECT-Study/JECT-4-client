import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

import Onboarding1 from '@assets/images/onboarding1.png';
import Onboarding2 from '@assets/images/onboarding2.png';
import Onboarding3 from '@assets/images/onboarding3.png';
import Onboarding4 from '@assets/images/onboarding4.png';

const OnboardingSwiper = () => {
    return (
        <Swiper
            modules={[Scrollbar, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            speed={500}
        >
            <SwiperSlide>
                <h1 className="text-display text-secondary">
                    목표를 향한 하나의 여행
                </h1>
                <h1 className="text-display text-point2">스터디 트립</h1>
                <p className="text-small text-text-min">
                    결과보다 과정을, 성취보다 성장의 가치를 발견해봐요
                </p>
                <div className="mt-7 px-9">
                    <img src={Onboarding1} alt="Onboarding 1" loading="lazy" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative">
                    <h1 className="text-display text-secondary">
                        스터디 유형 선택
                    </h1>
                    <p className="text-small text-text-min">
                        스터디트립과 함께할 나만의 학습 스타일을 골라주세요!
                    </p>
                    <div className="mt-17 px-9">
                        <img
                            src={Onboarding2}
                            alt="Onboarding 2"
                            loading="lazy"
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <h1 className="text-display text-secondary">학습 시작</h1>
                <p className="text-small text-text-min">
                    계획된 학습 일정에 따라 시간을 관리하고,
                    <br />
                    하나씩 완료해 나가요.
                </p>
                <div className="mt-11 px-9">
                    <img src={Onboarding3} alt="Onboarding 3" loading="lazy" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <h1 className="text-display text-secondary">학습 일지 기록</h1>
                <p className="text-small text-text-min">
                    성취된 학습 내용, 집중 시간, 그리고 메모를
                    <br />
                    학습 일지 기록에서 바로 확인하고 성장 과정을 되돌아보세요!
                </p>
                <div className="mt-11 px-9">
                    <img src={Onboarding4} alt="Onboarding 4" loading="lazy" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default OnboardingSwiper;

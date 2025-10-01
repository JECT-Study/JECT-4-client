import { useState } from 'react';
import { useNavigate } from 'react-router';
import SelectButton from '../../../components/common/button/SelectButton';
import MainButton from '../../../components/common/button/MainButton';

import { useAtom } from 'jotai';
import { signupUserInfoAtom } from '../../../store/signupUserInfoAtom';

import { accessTokenAtom } from '@store/auth';

import api from '@lib/axios';

function SetJobPage() {
    const [selected, setSelected] = useState<string>('');
    const navigate = useNavigate();
    const isNextDisabled = !selected;

    const [userInfo, setUserInfo] = useAtom(signupUserInfoAtom);
    const [, setAccessToken] = useAtom(accessTokenAtom);

    const handleSelect = (value: string) => {
        setSelected(value);
    };

    const handleSubmit = async () => {
        if (isNextDisabled) return;

        const updatedUserInfo = { ...userInfo, category: selected };

        setUserInfo(updatedUserInfo);

        try {
            const response = await api.post(
                '/auth/signup/kakao',
                updatedUserInfo
            );

            alert('회원가입에 성공하였습니다.');

            // 3. 성공 시 메인 페이지로 이동
            setAccessToken(response.data.data.accessToken);
            sessionStorage.setItem('signupFlag', 'true');
            navigate('/set-travel-type', { replace: true });
        } catch (error) {
            console.error('API 호출 실패:', error);
            alert('서버 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-between py-14">
            <section className="mb-12 rounded-lg py-5">
                <h1 className="text-display text-secondary">
                    직업을 설정해 주세요.
                </h1>
                <p className="text-small text-text-min">
                    선택해주신 직업군에 맞는 루틴을 추천해드릴게요.
                </p>
                <div className="mt-12 flex flex-col gap-4">
                    <SelectButton
                        value="STUDENT"
                        option="학생"
                        selected={selected}
                        onSelect={handleSelect}
                    ></SelectButton>
                    <SelectButton
                        value="WORKER"
                        option="직장인"
                        selected={selected}
                        onSelect={handleSelect}
                    ></SelectButton>
                    <SelectButton
                        value="FREELANCER"
                        option="프리랜서"
                        selected={selected}
                        onSelect={handleSelect}
                    ></SelectButton>
                    <SelectButton
                        value="JOBSEEKER"
                        option="취업준비생"
                        selected={selected}
                        onSelect={handleSelect}
                    ></SelectButton>
                </div>
            </section>
            <section className="py-5">
                <MainButton
                    disabled={isNextDisabled}
                    onClick={() => {
                        if (!isNextDisabled) {
                            handleSubmit();
                        }
                    }}
                ></MainButton>
            </section>
        </div>
    );
}

export default SetJobPage;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../../components/common/input/ClearableInput';
import MainButton from '@components/common/button/MainButton';

import { useAtom } from 'jotai';
import { signupUserInfoAtom } from '../../../store/signupUserInfoAtom';

import { validateNickname } from '@constants/regex';

function SetNamePage() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useAtom(signupUserInfoAtom);

    const handleSubmit = () => {
        if (!nickname) {
            alert('닉네임을 입력해 주세요.');
            return;
        }
        if (!validateNickname(nickname)) {
            alert('닉네임은 영어, 숫자, 한글 포함 2~10자로 입력해주세요.');
            return;
        }
        setUserInfo({ ...userInfo, nickname });
        navigate('/set-job', { replace: true });
    };

    const handleNicknameChange = (value: string) => {
        setNickname(value);
        setError(!validateNickname(value));
    };

    return (
        <div className="flex min-h-screen flex-col justify-between py-14">
            <section className="mb-12 rounded-lg bg-gradient-to-r py-5">
                <h1 className="text-display text-secondary">
                    닉네임을 설정해 주세요.
                </h1>
                <p className="text-small text-text-min">
                    스터디트립에서 당신을 표현할 이름을 만들어 보세요.
                </p>
                <div className="relative mt-12">
                    <Input
                        value={nickname}
                        onValueChange={handleNicknameChange}
                        placeholder="닉네임을 입력하세요"
                        borderColor={
                            error ? 'border-point1' : 'border-text-sub'
                        }
                    />
                </div>
                <p className="text-small text-point1 mt-2">
                    * 특수문자를 제외하고 2~10자 내로 입력해 주세요.
                </p>
            </section>
            <section className="py-5">
                <MainButton onClick={handleSubmit} />
            </section>
        </div>
    );
}

export default SetNamePage;

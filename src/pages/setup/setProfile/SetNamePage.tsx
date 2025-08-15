import { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../../components/common/input/ClearableInput';
import MainButton from '@components/common/button/MainButton';

import { useAtom } from 'jotai';
import { signupUserInfoAtom } from '../../../store/signupUserInfoAtom';

// const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;

function SetNamePage() {
    const [nickname, setNickname] = useState('');

    const [userInfo, setUserInfo] = useAtom(signupUserInfoAtom);

    const handleSubmit = () => {
        if (nickname) {
            setUserInfo({
                ...userInfo,
                nickname: nickname,
            });
            navigate('/set-job', { replace: true });
        } else {
            alert('닉네임을 입력해 주세요.');
        }
    };

    // const [error, setError] = useState('');

    // const handleNicknameChange = (value: string) => {
    //     setNickname(value);

    //     if (value.length === 0) {
    //         setError(''); // 빈값일 땐 에러 없음
    //     } else if (!nicknameRegex.test(value)) {
    //         setError('2~10자의 영문, 숫자, 한글만 사용할 수 있습니다.');
    //     } else {
    //         setError('');
    //     }
    // };

    const navigate = useNavigate();
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
                        onValueChange={setNickname}
                        placeholder="닉네임을 입력하세요"
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

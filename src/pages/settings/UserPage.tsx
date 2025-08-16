import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BackHeader from '../../components/common/BackHeaderLayout';
//import PhotoIcon from '../../assets/icons/photo.svg?react';
import ClearableInput from '../../components/common/input/ClearableInput';
import MainButton from '../../components/common/button/MainButton';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

import api from '@lib/axios';

const UserPage = () => {
    const navigate = useNavigate();
    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);
    const [nickname, setNickname] = useState(userName || '');

    const handleSave = async () => {
        try {
            const response = await api.patch('/members/me', {
                nickname: nickname,
            });
            fetchMemberName(nickname);
            console.log('프로필 저장 성공', response.data);
            alert('프로필이 저장되었습니다.');
            navigate('/settings', { replace: true });
        } catch (error) {
            console.warn('프로필 저장 실패', error);
        }
    };

    return (
        <div>
            <BackHeader title="프로필 관리" />
            <div className="flex min-h-screen w-full flex-col justify-between pb-14">
                <div className="pt-20">
                    {/* <div className="relative flex justify-center">
                        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white">
                            프로필
                        </div>
                        <div className="absolute right-1/3 -bottom-0 flex h-9 w-9 items-center justify-center rounded-full border border-[#e0e0e0] bg-white">
                            <PhotoIcon className="text-footer-unselected" />
                        </div>
                    </div> */}
                    <div>
                        <div className="text-text-sub text-body mb-1 font-semibold">
                            프로필 이름
                        </div>
                        <ClearableInput
                            value={nickname}
                            onValueChange={setNickname}
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                </div>
                <MainButton
                    colorClass="bg-text-sub"
                    disabled={!nickname}
                    onClick={handleSave}
                >
                    저장
                </MainButton>
            </div>
        </div>
    );
};

export default UserPage;

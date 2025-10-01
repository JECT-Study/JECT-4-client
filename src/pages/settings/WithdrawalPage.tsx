import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import BackHeader from '../../components/common/BackHeaderLayout';
import MainButton from '../../components/common/button/MainButton';
import api from '../../lib/axios';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

const WithdrawalPage = () => {
    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

    const handleWithdrawal = async () => {
        try {
            await api.delete('/members/me');
            alert('회원 탈퇴가 완료되었습니다.');
            navigate('/'); // 홈으로 리다이렉트
        } catch (error) {
            console.warn('회원탈퇴 실패', error);
        }
    };

    const navigate = useNavigate();
    return (
        <div>
            <BackHeader title="회원 탈퇴" />
            <div className="flex min-h-screen w-full flex-col justify-between pb-14">
                <div className="pt-20">
                    <div className="text-body py-4 font-semibold">
                        {userName}님과 이별하기 너무 아쉬워요.
                    </div>
                    <div className="text-small">
                        계정을 삭제하면 지금까지 만들어 온 모든 여행 기록들이
                        삭제됩니다. 또한 계정 삭제 요청은 최종이며 취소할 수
                        없습니다. 진행하기 전에 신중하게 고려해주세요.
                        <br />
                        정말 탈퇴하시겠어요?
                    </div>
                </div>
                <MainButton colorClass="bg-text-sub" onClick={handleWithdrawal}>
                    회원 탈퇴
                </MainButton>
            </div>
        </div>
    );
};

export default WithdrawalPage;

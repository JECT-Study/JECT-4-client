import { useEffect } from 'react';

import SetTravelHeader from '../_components/SetTravelHeader';
import TravelTypeList from './TravelTypeList';

import { useAtom } from 'jotai';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

// 로그인 이후 api 응답에서 userName 받아오기
const SetTravelTypePage = () => {
    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

    return (
        <div className="text-text-min pt-6">
            <SetTravelHeader
                title={
                    <>
                        {userName}님, <br />
                        당신의 여행 스타일을 알려주세요.
                    </>
                }
                description="마음 가는 대로, 혹은 계획대로? 여행 방식을 선택해주세요"
            />
            <TravelTypeList />
        </div>
    );
};

export default SetTravelTypePage;

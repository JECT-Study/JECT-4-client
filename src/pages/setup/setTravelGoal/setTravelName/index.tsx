import { lazy, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useAtom } from 'jotai';

import SetTravelHeader from '../_components/SetTravelHeader';
import { memberNameAtom, fetchMemberNameAtom } from '@store/userInfoAtom';

const SetTravelNameForm = lazy(() => import('./SetTravelNameForm'));

type travelType = 'course' | 'explore';

const SetTravelNamePage = () => {
    // 유저이름 불러오기
    const [userName] = useAtom(memberNameAtom);
    const [, fetchMemberName] = useAtom(fetchMemberNameAtom);

    useEffect(() => {
        fetchMemberName();
    }, [fetchMemberName]);

    const searchParams = useSearchParams()[0];
    const travelType = searchParams.get('type') as travelType;

    const travelTypeMap = {
        course: (
            <>
                코스형을 선택한 {userName}님, <br />
                여행의 여정을 계획해봐요!
            </>
        ),
        explore: (
            <>
                탐험형을 선택한 {userName}님, <br />
                여행의 여정을 계획해봐요!
            </>
        ),
    };

    return (
        <div className="pt-6 pb-20">
            <SetTravelHeader title={travelTypeMap[travelType]} />
            <SetTravelNameForm travelType={travelType} />
        </div>
    );
};

export default SetTravelNamePage;

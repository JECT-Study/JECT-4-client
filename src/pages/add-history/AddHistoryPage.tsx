import GoalCard, { type GoalCardProps } from './_components/GoalCard';

import { history, goalCardContents } from '../../mocks/history.ts';
import MissionHistory from '@components/history/MissionHistory.tsx';
import MainButton from '@components/common/button/MainButton.tsx';

type GoalCardContentsType = {
    [K in GoalCardProps['type']]: number;
};

const AddHistoryPage = () => {
    return (
        <div>
            <div className="h-[90vh] overflow-y-auto pb-7">
                <section className="pt-16">
                    <h1 className="text-title text-secondary">
                        여행을 멋지게 완주했어요!
                    </h1>
                    <p className="text-small text-text-min">
                        ㅇㅇ님이 떠난 여정은 이렇게 이어졌어요.
                    </p>
                </section>
                <div className="bg-background sticky top-0 z-10 flex items-center justify-between pt-10">
                    <div className="bg-primary text-background text-small rounded-md p-1.5">
                        ㅇㅇ 여정
                    </div>
                    <div className="text-caption text-text-min">
                        년 월 일 ~ 년 월 일
                    </div>
                </div>
                <div className="mt-3 flex w-full gap-2.5">
                    {Object.keys(goalCardContents).map((keyAsString) => {
                        const type = keyAsString as keyof GoalCardContentsType;

                        return (
                            <GoalCard
                                type={type}
                                key={type}
                                goal={goalCardContents[type]}
                            />
                        );
                    })}
                </div>
                <div className="mt-5">
                    <div className="text-text-sub text-small">
                        공부 흔적을 사진으로 남겨보세요
                    </div>
                    <div className="mt-3">사진 업로드 컴포넌트</div>
                    <div className="text-small text-primary mt-2">
                        * 선택사항입니다.
                    </div>
                </div>
                <div className="bg-background sticky top-18 z-10 pt-5">
                    <div className="text-text-sub text-small">회고록 작성</div>
                    <textarea
                        id="history-note"
                        className="border-input-sub mt-2 max-h-80 w-full rounded-md border bg-white px-4 py-3"
                        placeholder="이번 여정에서 내가 가장 기억하는 순간은…"
                    />
                </div>
                <div>
                    <MissionHistory type="write" historyList={history} />
                </div>
            </div>

            <div className="absolute bottom-12 w-[calc(100%-40px)]">
                <MainButton
                    onClick={() => {
                        console.log('완료');
                    }}
                >
                    완료
                </MainButton>
            </div>
        </div>
    );
};

export default AddHistoryPage;

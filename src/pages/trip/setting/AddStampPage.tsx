import MainButton from '../../../components/common/button/MainButton';
import BackHeader from '../../../components/common/BackHeaderLayout';
import Calendar from './_components/Calendar';

const AddStampPage = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="h-[4rem]">
                <BackHeader title="스탬프 추가" />
            </div>
            <section className="flex flex-col gap-2">
                <span className="text-body text-text-min">스탬프 이름</span>
                <input
                    id="stamp-name"
                    className="border-input-sub placeholder:text-subtitle focus:outline-input-sub h-[3.1875rem] rounded-md border bg-[#F8F7F5] px-4 py-3 placeholder:text-[rgba(117,117,117,0.40)] focus:bg-white"
                    placeholder="문제 유형 파악"
                />
            </section>
            <section className="flex flex-col gap-2 pt-6">
                <span className="text-body text-text-min">마감일</span>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="accent-text-sub h-[1.375rem] w-[1.375rem]"
                    />
                    <p className="text-text-min text-body">마감일 없음</p>
                </div>
            </section>
            <section className="flex flex-col gap-3 pt-5">
                <div>
                    <p className="text-text-min text-body">
                        날짜를 선택해 주세요
                    </p>
                    <p className="text-point1 text-small">
                        *여행 기간 내에서만 마감일을 설정할 수 있어요.
                    </p>
                </div>
                <Calendar year={2025} month={6} />
            </section>
            <div className="pt-3">
                <MainButton
                    onClick={() => console.log('버튼 클릭')}
                    colorClass="bg-text-sub"
                >
                    저장
                </MainButton>
            </div>
        </div>
    );
};

export default AddStampPage;

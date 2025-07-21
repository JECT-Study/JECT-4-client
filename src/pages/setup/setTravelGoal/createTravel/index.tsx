import { useState } from 'react';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const weekNumbers = [1, 2, 3, 4, 5, 6, 7];

const CreateTravelPage: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<number>(3); // 수요일(4일, index 3)
    const [goalName, setGoalName] = useState('토익뿌시기');
    const [memo, setMemo] = useState('');

    return (
        <main className="flex min-h-screen flex-col items-center bg-[#FFFAEF] px-4 py-8 sm:py-12">
            <section className="mx-auto w-full max-w-md">
                <header className="mb-8">
                    <h1 className="mb-2 text-3xl leading-tight font-bold text-[#364B59]">
                        이번 여행의 이름은 무엇인가요?
                    </h1>
                    <p className="mb-4 text-base text-[#757575]">
                        도착지(목표일)를 설정하면, 여정이 더 선명해져요.
                    </p>
                    <span className="mb-4 block text-lg text-[#6FC8BE]">2025년 6월 4일부터</span>
                    <div className="mb-6 rounded-xl p-4 shadow">
                        <div className="mb-2 flex items-center justify-between">
                            {weekDays.map((day, index) => (
                                <span
                                    key={index}
                                    className="w-7 text-center text-base font-medium text-[#757575]"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            {weekNumbers.map((num, index) => (
                                <button
                                    key={num}
                                    type="button"
                                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-lg transition ${selectedDay === index ? 'border-[#6FC8BE] text-[#364B59]' : 'border-transparent text-[#364B59]/80'}`}
                                    aria-pressed={selectedDay === index}
                                    onClick={() => setSelectedDay(index)}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <span className="mt-2 inline-block">
                                <svg
                                    width="28"
                                    height="20"
                                    viewBox="0 0 28 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 18L2 6.5L3.5 5L14 15L24.5 5L26 6.5L14 18Z"
                                        fill="#B0B0B0"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </header>
                <form
                    className="flex flex-col gap-6"
                    autoComplete="off"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div>
                        <label
                            htmlFor="goalName"
                            className="mb-2 block text-lg font-medium text-[#757575]"
                        >
                            여행 이름
                        </label>
                        <input
                            id="goalName"
                            type="text"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            placeholder="여행 이름을 입력하세요"
                            className="w-full rounded-lg border border-[#895A3F]/60 bg-[#F5F5F5] px-4 py-4 text-2xl font-bold text-[#B0B0B0] placeholder-[#B0B0B0] focus:ring-2 focus:ring-[#6FC8BE] focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="memo"
                            className="mb-2 block text-lg font-medium text-[#757575]"
                        >
                            메모 추가
                        </label>
                        <textarea
                            id="memo"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            placeholder="꼭 지켜야 할 내용을 작성해 주세요"
                            className="min-h-[120px] w-full resize-none rounded-lg border border-[#895A3F]/60 bg-[#F5F5F5] px-4 py-4 text-lg text-[#757575] placeholder-[#B0B0B0] focus:ring-2 focus:ring-[#6FC8BE] focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-8 w-full rounded-lg bg-[#6FC8BE] py-4 text-xl font-bold text-white shadow-md transition active:scale-95 disabled:opacity-50"
                    >
                        확인
                    </button>
                </form>
            </section>
        </main>
    );
};

export default CreateTravelPage;

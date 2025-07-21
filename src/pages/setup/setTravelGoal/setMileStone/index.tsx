import { useState } from "react";

interface Milestone {
    id: number;
    text: string;
}

const initialMilestones: Milestone[] = [
    { id: 1, text: "유형연습 Q8-10 복습" },
    { id: 2, text: "기출포인트 필수 이론 정리" },
    { id: 3, text: "실전모의고사 1-3회 풀기" },
    { id: 4, text: "실전모의고사 4-5회 풀기" },
];

const SetMileStonePage: React.FC = () => {
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
    const [input, setInput] = useState("");
    const [nextId, setNextId] = useState(5);

  // Add new milestone
const handleAdd = () => {
    if (input.trim()) {
        setMilestones([...milestones, { id: nextId, text: input.trim() }]);
        setNextId(nextId + 1);
        setInput("");
    }
};

// Remove milestone
const handleRemove = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id));
};

  // Drag & drop (reorder)
const handleDragStart = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    e.dataTransfer.setData("text/plain", idx.toString());
};
const handleDrop = (e: React.DragEvent<HTMLDivElement>, idx: number) => {
    const fromIdx = Number(e.dataTransfer.getData("text/plain"));
    if (fromIdx === idx) return;
    const updated = [...milestones];
    const [removed] = updated.splice(fromIdx, 1);
    updated.splice(idx, 0, removed);
    setMilestones(updated);
};
const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
};

return (
    <main className="min-h-screen bg-[#FFFAEF] flex flex-col items-center px-4 py-8 sm:py-12">
        <section className="w-full max-w-md mx-auto">
        <header className="mb-8 flex flex-col gap-2">
            <button type="button" aria-label="뒤로가기" className="w-8 h-8 mb-2 text-[#895A3F]">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="#895A3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>
             <h1 className="text-2xl font-bold text-[#364B59] leading-tight">
            여행의 여정을 구성해보세요.<br />
            목표를 순서대로 입력해 주세요.
          </h1>
          <p className="text-base text-[#757575]">
            계획 된 순서와 단계에 따라 진행하는 목표입니다.
          </p>
        </header>
        <section className="flex flex-col gap-4 mb-6">
          {milestones.map((m, idx) => (
            <div
              key={m.id}
              className="flex items-center bg-white rounded-xl shadow px-4 py-5 justify-between gap-2 cursor-grab"
              draggable
              onDragStart={e => handleDragStart(e, idx)}
              onDrop={e => handleDrop(e, idx)}
              onDragOver={handleDragOver}
            >
              <span className="flex items-center text-2xl text-[#895A3F] mr-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <rect x="6" y="8" width="16" height="2.5" rx="1.25" fill="#895A3F"/>
                  <rect x="6" y="13" width="16" height="2.5" rx="1.25" fill="#895A3F"/>
                  <rect x="6" y="18" width="16" height="2.5" rx="1.25" fill="#895A3F"/>
                </svg>
              </span>
              <span className="flex-1 text-lg font-bold text-[#895A3F] text-left">
                {m.text}
              </span>
              <button
                type="button"
                aria-label="삭제"
                onClick={() => handleRemove(m.id)}
                className="ml-2 p-1"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="13" stroke="#895A3F" strokeWidth="2" fill="none" />
                  <path d="M10 10l8 8M18 10l-8 8" stroke="#895A3F" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </section>
        <section className="flex flex-col gap-4 mb-8">
          <div className="bg-[#F5F1E6] rounded-xl flex items-center px-4 py-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }}}
              placeholder="목표를 입력하세요"
              className="flex-1 bg-transparent outline-none text-lg text-[#364B59] placeholder-[#B0B0B0]"
            />
            <button
              type="button"
              aria-label="추가"
              onClick={handleAdd}
              className="ml-2 text-3xl text-[#364B59] font-bold px-2"
            >
              +
            </button>
          </div>
        </section>
        <footer className="w-full flex flex-col items-center">
          <button
            type="button"
            className="w-full rounded-lg bg-[#6FC8BE] text-white font-bold py-4 text-xl shadow-md active:scale-95 transition disabled:opacity-50"
            disabled={milestones.length === 0}
          >
            확인
          </button>
        </footer>
      </section>
    </main>
  );
};

export default SetMileStonePage; 
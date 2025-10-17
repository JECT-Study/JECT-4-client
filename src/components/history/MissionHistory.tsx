import { useState } from 'react';

import ChevronDown from '../../assets/icons/chevron-down.svg?react';
import ChevronUp from '../../assets/icons/chevron-up.svg?react';
import { headerFontStyles, headerStyles } from './_styles/MissionHistoryStyle';

export interface History {
    date: string;
    contents: string[];
}

export interface HistoryPageProps {
    type?: 'write' | 'history';
    historyList: History[];
}

const MissionHistory = ({
    type = 'history',
    historyList,
}: HistoryPageProps) => {
    const [openCardIndex, setOpenCardIndex] = useState(new Set<number>());

    function handleChevronClick(index: number) {
        const newOpenCardIndex = new Set(openCardIndex);

        if (newOpenCardIndex.has(index)) newOpenCardIndex.delete(index);
        else newOpenCardIndex.add(index);

        setOpenCardIndex(newOpenCardIndex);
    }

    return (
        <div className="flex flex-col pt-3">
            <header
                className={`${headerStyles[type]} flex h-[3.125rem] items-center rounded-t-md p-3`}
            >
                <p
                    className={`${headerFontStyles[type]} text-base font-semibold`}
                >
                    미션 히스토리
                </p>
            </header>
            <div className="max-h-[23rem] overflow-auto rounded-b-md border-1 border-[#E2E2E2] bg-white">
                {historyList.map((history, index) => {
                    const isCardOpen = openCardIndex.has(index);

                    return (
                        <article key={index}>
                            <header className="flex justify-between border-b-1 border-[#E2E2E2] px-3 py-2">
                                <p className="text-text-sub text-base font-semibold">
                                    {history.date}
                                </p>
                                <button
                                    onClick={() => handleChevronClick(index)}
                                >
                                    {isCardOpen ? (
                                        <ChevronDown />
                                    ) : (
                                        <ChevronUp />
                                    )}
                                </button>
                            </header>
                            {isCardOpen && (
                                <div className="flex py-2">
                                    <ul className="text-secondary marker:text-secondary flex list-disc flex-col pl-10 text-sm font-normal">
                                        {history.contents.map(
                                            (content, index) => (
                                                <li
                                                    key={index}
                                                    className="pr-5"
                                                >
                                                    {content}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default MissionHistory;

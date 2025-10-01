import Header from '../_componenets/Header';
import MissionHistory from '../../../components/history/MissionHistory';

import { history, goalCardContents } from '../../../mocks/history';
import { FirstSection, SecondSection, ThirdSection } from '../_layouts/';

const HistoryPage = () => {
    return (
        <div>
            <Header text="조별 과제 PPT 만들기" />
            <div className="flex h-[calc(100vh-8rem)] flex-col gap-6 overflow-auto [&::-webkit-scrollbar]:hidden">
                <FirstSection goalCardContents={goalCardContents} />
                <SecondSection />
                <ThirdSection />
                <section>
                    <MissionHistory historyList={history} />
                </section>
            </div>
        </div>
    );
};

export default HistoryPage;

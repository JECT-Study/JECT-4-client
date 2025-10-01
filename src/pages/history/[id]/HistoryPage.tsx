import MissionHistory from '../../../components/common/MissionHistory';
import { history } from '../../../mocks/history';

const HistoryPage = () => {
    return (
        <div>
            <MissionHistory historyList={history} />
        </div>
    );
};

export default HistoryPage;

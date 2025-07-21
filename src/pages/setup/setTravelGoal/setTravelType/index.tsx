import SetTravelTypeHeader from './SetTravelTypeHeader';
import TravelTypeList from './TravelTypeList';

// 로그인 이후 api 응답에서 userName 받아오기
const SetTravelTypePage = () => {
    return (
        <div className="pt-[106px]">
            <SetTravelTypeHeader userName="수진" />
            <TravelTypeList />
        </div>
    );
};

export default SetTravelTypePage;

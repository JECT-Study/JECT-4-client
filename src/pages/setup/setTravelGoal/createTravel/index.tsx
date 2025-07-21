import SetTravelHeader from '../_components/SetTravelHeader';
import CreateTravelLinearForm from './CreateTravelLinearForm';

// 여행 이름 설정
// Safe area (상태바, 노치) 고려한 pt
const CreateTravelPage = () => {
    const userName = '수진';
    return (
        <div className="pt-[106px] pb-20">
            <SetTravelHeader
                title={
                    <>
                        코스형을 선택한 {userName}님, <br />
                        여행의 여정을 계획해봐요!
                    </>
                }
            />
            {/* 여행 이름 설정 (선형, 코스형) */}
            {/* 테스트를 위한 주석 추가*/}
            <CreateTravelLinearForm />
        </div>
    );
};

export default CreateTravelPage;

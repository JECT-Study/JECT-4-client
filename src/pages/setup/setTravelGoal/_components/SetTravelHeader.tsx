import { useLocation, useNavigate } from 'react-router';
import arrowBackIcon from '../../../../assets/icons/arrow_back.svg';

interface SetTravelHeaderProps {
    title: JSX.Element;
    description?: string;
}

const SetTravelHeader = ({ title, description }: SetTravelHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <img
                src={arrowBackIcon}
                alt="뒤로 가기"
                className="mb-[17px] cursor-pointer"
                onClick={() => {
                    // 회원가입 후 해당 페이지로 왔을 경우, 여행 타입 선택 페이지에서 뒤로가기 누르면 메인 페이지로 이동
                    if (location.pathname === '/set-travel-type') {
                        const signupFlag = sessionStorage.getItem('signupFlag');
                        if (signupFlag) {
                            sessionStorage.removeItem('signupFlag');
                            navigate('/main');
                            return;
                        }
                    }

                    navigate(-1);
                }}
            />
            <header className="flex flex-col gap-1">
                <h1 className="text-secondary text-title">{title}</h1>
                <p className="text-text-min text-small">{description}</p>
            </header>
        </div>
    );
};

export default SetTravelHeader;

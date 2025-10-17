import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const useValidatedTripId = () => {
    const navigate = useNavigate();
    const { tripId: tripIdParam } = useParams<{ tripId: string }>();

    const tripId = useMemo(() => {
        const number = Number(tripIdParam);
        return Number.isFinite(number) && number > 0 ? number : null;
    }, [tripIdParam]);

    const isValid = tripId !== null;

    useEffect(() => {
        if (!isValid) {
            alert('잘못된 여행 ID입니다.');
            navigate(-1);
        }
    }, [isValid, navigate]);

    return tripId;
};

export default useValidatedTripId;

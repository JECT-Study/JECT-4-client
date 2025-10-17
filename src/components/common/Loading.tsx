import Lottie from 'lottie-react';
import loadingLottie from '@assets/lottie/loading.json';

const Loading = () => {
    return (
        <div className="flex h-[100vh] w-full items-center justify-center">
            <Lottie
                className="h-[24rem] w-[24rem]"
                animationData={loadingLottie}
            />
        </div>
    );
};

export default Loading;

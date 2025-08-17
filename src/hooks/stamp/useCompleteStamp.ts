import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeStamp } from '../../services/stamp/stamps';
import type { ResponseDTO, MutationStampProps } from '../../types/stamp';
import { toast } from 'react-toastify';

const useCompleteStamp = () => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        ResponseDTO,
        Error,
        MutationStampProps
    >({
        mutationFn: async ({ tripId, stampId }) => {
            return completeStamp(tripId, stampId);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['stamp', variables.tripId, variables.stampId],
            });
        },
        onError: () => {
            toast.error('스탬프를 완료하지 못했습니다.');
        },
    });

    return { mutateCompleteStamp: mutate, ...rest };
};

export default useCompleteStamp;

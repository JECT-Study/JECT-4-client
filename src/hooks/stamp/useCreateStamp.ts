import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateStamp, ResponseDTO } from '../../types/stamp';
import { createStamp } from '@services/stamp/stamps';

interface MutationCreateStampPayload {
    tripId: number;
    body: CreateStamp;
}

const useCreateStamp = () => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        ResponseDTO,
        Error,
        MutationCreateStampPayload
    >({
        mutationFn: async ({ tripId, body }) => {
            return createStamp(tripId, body);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['tripDetail', variables.tripId],
            });
        },
        onError: () => {
            toast.error('스탬프를 추가하지 못했습니다. 다시 시도해 주세요.');
        },
    });

    return { mutateCreateStamp: mutate, ...rest };
};

export default useCreateStamp;

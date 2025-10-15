import { patchStamp } from '@services/stamp/stamps';
import type { ResponseDTO } from '../../types/stamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface MutationPatchStampPayload {
    tripId: number;
    stampId: number;
    name: string;
}

interface UsePatchStampOptions {
    onSuccess?: (
        response: ResponseDTO,
        variables: MutationPatchStampPayload
    ) => void;
    onError?: (error: Error, variables: MutationPatchStampPayload) => void;
}

const usePatchStamp = (options?: UsePatchStampOptions) => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        ResponseDTO,
        Error,
        MutationPatchStampPayload
    >({
        mutationFn: async ({ tripId, stampId, name }) =>
            patchStamp(tripId, stampId, { name }),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['stamp', variables.tripId, variables.stampId],
            });

            options?.onSuccess?.(response, variables);
        },
        onError: () => {
            toast.error('여행 정보 수정에 실패했습니다. 다시 시도해 주세요.');
        },
    });

    return { mutatePatchStamp: mutate, ...rest };
};

export default usePatchStamp;

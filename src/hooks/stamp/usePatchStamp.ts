import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { TripDetail } from '../../types/trip/trip';
import { patchStamp } from '@services/stamp/stamps';

interface MutationPatchStampPayload {
    tripId: number;
    stampId: number;
    name: string;
}

interface UsePatchStampOptions {
    onSuccess?: (
        response: unknown,
        variables: MutationPatchStampPayload
    ) => void;
    onError?: (error: Error, variables: MutationPatchStampPayload) => void;
}

const usePatchStamp = (options?: UsePatchStampOptions) => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        unknown,
        Error,
        MutationPatchStampPayload
    >({
        mutationFn: async ({ tripId, stampId, name }) =>
            patchStamp(tripId, stampId, { name }),
        onSuccess: (response, variables) => {
            queryClient.setQueryData<TripDetail>(
                ['tripDetail', variables.tripId],
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        stamps: oldData.stamps.map((s: any) =>
                            s.stampId === variables.stampId
                                ? { ...s, stampName: variables.name }
                                : s
                        ),
                    };
                }
            );

            options?.onSuccess?.(response, variables);
        },
        onError: () => {
            toast.error('스탬프 수정에 실패했습니다. 다시 시도해 주세요.');
        },
    });

    return { mutatePatchStamp: mutate, ...rest };
};

export default usePatchStamp;

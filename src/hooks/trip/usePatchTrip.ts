import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTrip } from '../../services/trip/trip';
import type { ResponseDTO } from '../../types/stamp';
import type { TripRequestBody } from '../../types/trip/trip';

interface MutationPatchTripPayload {
    tripId: number;
    data: TripRequestBody;
}

interface UsePatchTripOptions {
    onSuccess?: (
        response: ResponseDTO,
        variables: MutationPatchTripPayload
    ) => void;
    onError?: (error: Error, variables: MutationPatchTripPayload) => void;
}

const usePatchTrip = (options?: UsePatchTripOptions) => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        ResponseDTO,
        Error,
        MutationPatchTripPayload
    >({
        mutationFn: async ({ tripId, data }) => patchTrip(tripId, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['tripDetail', variables.tripId],
            });

            options?.onSuccess?.(response, variables);
        },
        onError: (error, variables) => {
            toast.error('여행 정보 수정에 실패했습니다. 다시 시도해 주세요.');
            options?.onError?.(error, variables);
        },
    });

    return { mutatePatchTrip: mutate, ...rest };
};

export default usePatchTrip;

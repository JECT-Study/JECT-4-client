import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ResponseDTO, StampStatus } from '../../types/stamp';
import { deleteStamp } from '@services/stamp/stamps';

interface TripData {
    tripId: number;
    tripName: string;
    stamps: StampStatus[];
}

interface MutationDeleteStampPayload {
    tripId: number;
    stampId: number;
}

const useDeleteStamp = () => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        ResponseDTO,
        Error,
        MutationDeleteStampPayload,
        { previousTrip?: TripData }
    >({
        mutationFn: async ({ tripId, stampId }) => deleteStamp(tripId, stampId),
        onMutate: async (variables) => {
            await queryClient.cancelQueries({
                queryKey: ['tripDetail', variables.tripId],
            });

            const previousTrip = queryClient.getQueryData<TripData>([
                'tripDetail',
                variables.tripId,
            ]);

            queryClient.setQueryData<TripData>(
                ['tripDetail', variables.tripId],
                (oldTrip) => {
                    if (!oldTrip) return oldTrip;
                    return {
                        ...oldTrip,
                        stamps: oldTrip.stamps.filter(
                            (s) => s.stampId !== variables.stampId
                        ),
                    };
                }
            );

            return { previousTrip };
        },
        onError: (_, variables, context) => {
            if (context?.previousTrip) {
                queryClient.setQueryData(
                    ['tripDetail', variables.tripId],
                    context.previousTrip
                );
            }

            toast.error('스탬프 삭제에 실패했습니다.');
        },
    });

    return { mutateDeleteStamp: mutate, ...rest };
};

export default useDeleteStamp;

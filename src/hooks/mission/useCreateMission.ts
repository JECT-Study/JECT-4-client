import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMissions } from '../../services/mission/missions';
import type {
    MissionItem,
    MissionMutationProps,
    RequestSuccess,
    ServerMissionItem,
} from '../../types/mission/Mission';
import { toast } from 'react-toastify';

type CreateMissionMutationProps = Omit<MissionMutationProps, 'missionId'>;

const useCreateMission = () => {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation<
        RequestSuccess,
        Error,
        CreateMissionMutationProps,
        { previousMissions?: ServerMissionItem[]; tempMissionId?: number }
    >({
        mutationFn: async ({ tripId, stampId, missionContent }) => {
            return createMissions(tripId, stampId, missionContent);
        },
        onMutate: async (variables) => {
            // 1. 현재 쿼리 취소
            await queryClient.cancelQueries({
                queryKey: ['missions', variables.tripId, variables.stampId],
            });

            // 2. 이전 데이터 저장
            const previousMissions = queryClient.getQueryData<
                ServerMissionItem[]
            >(['missions', variables.tripId, variables.stampId]);

            // 3. 낙관적 업데이트
            const tempMissionId = Number(uuidv4());

            const newLocalMission: MissionItem = {
                missionId: tempMissionId,
                missionName: variables.missionContent.missionName || '',
                completed: false,
                isEditing: true,
                isChecked: false,
            };

            queryClient.setQueryData<MissionItem[]>(
                ['missions', variables.tripId, variables.stampId],
                (oldMissions) => {
                    return oldMissions
                        ? [...oldMissions, newLocalMission]
                        : [newLocalMission];
                }
            );

            return { previousMissions, tempMissionId };
        },
        onSuccess: (data, variables) => {
            console.log('미션 추가 성공:', data.data);

            queryClient.invalidateQueries({
                queryKey: ['missions', variables.tripId, variables.stampId],
            });
        },
        onError: (_, variables, context) => {
            toast.error('미션 추가에 실패했습니다.');

            if (context?.previousMissions) {
                queryClient.setQueryData<ServerMissionItem[]>(
                    ['missions', variables.tripId, variables.stampId],
                    context.previousMissions
                );
            }
        },
    });

    return { mutateCreateMission: mutate, ...rest };
};

export default useCreateMission;

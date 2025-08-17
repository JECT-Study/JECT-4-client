import { atom } from 'jotai';
import type {
    QueryObserverResult,
    RefetchOptions,
} from '@tanstack/react-query';
import type { MissionItem, ServerMissionItem } from '../types/mission/Mission';

type RefetchMissions =
    | ((
          options?: RefetchOptions
      ) => Promise<QueryObserverResult<ServerMissionItem[], Error>>)
    | null;

export const missionsAtom = atom<MissionItem[]>([]);
export const missionRefetchAtom = atom<RefetchMissions>(null);

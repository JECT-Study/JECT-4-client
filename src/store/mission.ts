import { atom } from 'jotai';
import type { MissionItem } from '../types/mission/Mission';

export const missionsAtom = atom<MissionItem[]>([]);

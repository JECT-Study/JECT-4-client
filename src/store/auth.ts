import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const sessionStorageAtom = atomWithStorage(
    'access-token',
    null as string | null,
    createJSONStorage(() => sessionStorage)
);

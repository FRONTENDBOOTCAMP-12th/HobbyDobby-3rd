import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

interface Hobby {
  nowHobby: number | null;
}
const initialHobby: Hobby = {
  nowHobby: null,
};

export const useHobbyStore = create(
  persist(
    devtools(
      combine({ ...initialHobby }, (set) => ({
        updateHobby: (nowHobby: number | null) =>
          set(
            {
              nowHobby,
            },
            undefined,
            'nowHobby/update'
          ),
      }))
    ),
    { name: 'store/hobby' }
  )
);

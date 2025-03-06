import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

interface Gem {
  gem: number;
}

const initialGem: Gem = {
  gem: 0,
};

export const useGemStore = create(
  persist(
    devtools(
      combine({ ...initialGem }, (set) => ({
        updateGem: (gem: number) =>
          set(
            {
              gem,
            },
            undefined,
            'userGem/update'
          ),
      }))
    ),
    { name: 'store/gem' }
  )
);

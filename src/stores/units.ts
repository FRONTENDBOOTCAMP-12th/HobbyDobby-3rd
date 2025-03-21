import { UnitData } from '@/lib/supabase-client';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

interface Units {
  sections: UnitData[][];
}

const initialUnits: Units = {
  sections: [],
};

export const useUnitsStore = create(
  persist(
    devtools(
      combine(
        {
          ...initialUnits,
        },
        (set) => ({
          setSections: (units: Units) => set({ ...units }),
        })
      )
    ),
    { name: 'store/units' }
  )
);

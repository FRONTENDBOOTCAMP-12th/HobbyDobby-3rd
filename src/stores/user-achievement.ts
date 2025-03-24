import { AchievementCardProps } from '@/types/my-page/achievement';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserAchievementState {
  uid: string;
  gem: number | null;
  completedChallenges: number;
  completedAchievements: string[];
  achievements: AchievementCardProps[];
  setGem: (value: number) => void;
  setAchievements: (value: AchievementCardProps[]) => void;
  resetAchievements: () => void;
  setUid: (uid: string) => void;
}

// 상태 정의
export const useUserAchievementStore = create<UserAchievementState>()(
  persist(
    (set) => ({
      uid: '',
      gem: null,
      completedChallenges: 0,
      completedAchievements: [],
      achievements: [],
      setGem: (value) => set({ gem: value }),
      setAchievements: (value) => set({ achievements: value }),

      // 상태 초기화 함수 추가
      resetAchievements: () =>
        set({
          uid: '',
          gem: null,
          completedChallenges: 0,
          completedAchievements: [],
          achievements: [],
        }),

      // 새로운 유저 로그인 시 상태 초기화
      setUid: (uid) =>
        set((state) => {
          if (state.uid !== uid) {
            return {
              uid,
              gem: null,
              completedChallenges: 0,
              completedAchievements: [],
              achievements: [],
            };
          }
          return state;
        }),
    }),
    {
      name: 'store/user-achievements', // localStorage 키 이름
      partialize: (state) => ({
        uid: state.uid,
        gem: state.gem,
        completedChallenges: state.completedChallenges,
        completedAchievements: state.completedAchievements,
        achievements: state.achievements,
      }),
    }
  )
);

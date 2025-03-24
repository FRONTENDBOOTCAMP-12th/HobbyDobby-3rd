import { AchievementCardProps } from '@/types/my-page/achievement';
import { create } from 'zustand';

interface UserAchievementState {
  uid: string;
  gem: number | null;
  completedChallenges: number;
  completedAchievements: string[];
  achievements: AchievementCardProps[];
  setGem: (value: number) => void;
  setAchievements: (value: AchievementCardProps[]) => void;
}

// 상태 정의
export const useUserAchievementStore = create<UserAchievementState>((set) => ({
  uid: '',
  gem: null,
  completedChallenges: 0,
  completedAchievements: [],
  achievements: [],
  setGem: (value) => set({ gem: value }),
  setAchievements: (value) => set({ achievements: value }),
}));

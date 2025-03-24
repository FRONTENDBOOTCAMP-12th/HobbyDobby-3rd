import {
  getAchievementByLevelType,
  getUserGem,
  insertUserTitle,
  updateUserGem,
} from '@/lib/api';
import { useUserAchievementStore } from '@/stores/user-achievement';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const useHandleReward = () => {
  const [userGem, setUserGem] = useState<number | null>(null);
  const userId = useUserAchievementStore((state) => state.uid) ?? null;

  // Zustand에서 업적 상태 가져오기
  const [achievements, setAchievements] = useState(
    useUserAchievementStore((state) => state.achievements)
  );

  useEffect(() => {
    if (userId) {
      const fetchUserGem = async () => {
        // Zustand에 gem 상태가 있으면 재사용
        const cachedGem = useUserAchievementStore.getState().gem;
        if (cachedGem !== null) {
          setUserGem(cachedGem);
          return;
        }

        const gem = await getUserGem(userId);
        useUserAchievementStore.setState({ gem });
        setUserGem(gem);
      };

      void fetchUserGem();
    }
  }, [userId]);

  const handleReward = useCallback(
    async (id: string, level: number, type: string) => {
      try {
        // 상태가 최신이면 API 호출 방지
        const cachedAchievement = achievements.find(
          (a) => a.level === level && a.type === type
        );

        if (!cachedAchievement) {
          const completedAchievement = await getAchievementByLevelType(
            level,
            type as 'attendance_days' | 'exp' | 'completed_challenges'
          );

          if (!completedAchievement) return;

          // 상태에 저장
          useUserAchievementStore.setState({
            achievements: achievements.map((achievement) => ({
              ...achievement,
              id: achievement.id,
              level: achievement.level,
              type: achievement.type,
              name: achievement.name,
              current: achievement.current,
              total: achievement.total,
              isMax: achievement.isMax ?? false,
              onReward: achievement.onReward,
            })),
          });

          // 보상 지급 처리
          if (completedAchievement.reward_gem) {
            const newGem = (userGem ?? 0) + completedAchievement.reward_gem;
            await updateUserGem(userId, newGem);
            useUserAchievementStore.setState({ gem: newGem });
            setUserGem(newGem);
          }

          if (completedAchievement.reward_title) {
            await insertUserTitle(userId, completedAchievement.reward_title);
          }
        }

        setAchievements((prevAchievements) =>
          prevAchievements.map((achievement) => {
            if (achievement.id === id && achievement.isMax) {
              return {
                ...achievement,
                level: achievement.level,
                current: 0,
                isMax: false,
              };
            }
            return achievement;
          })
        );

        await Swal.fire({
          icon: 'success',
          title: '보상이 지급되었습니다!',
        });
      } catch (error) {
        console.error('Error inserting user achievement:', error);
      }
    },
    [userId, userGem, achievements]
  );

  return {
    achievements,
    handleReward,
    userGem,
    setAchievements,
  };
};

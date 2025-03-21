import {
  getAchievementByLevelType,
  getUserGem,
  insertUserAchievement,
  insertUserTitle,
  updateUserGem,
} from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { AchievementCardProps } from '@/types/my-page/achievement';
import { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

export const useHandleReward = () => {
  const [achievements, setAchievements] = useState<AchievementCardProps[]>([]);
  const userId = useUserStore((state) => state.uid) ?? null;

  const handleReward = useCallback(
    async (id: string, level: number, type: string) => {
      try {
        // 이미 업적을 가져온 경우 재사용
        const completedAchievement = await getAchievementByLevelType(
          level,
          type as 'attendance_days' | 'exp' | 'completed_challenges'
        );

        if (!completedAchievement) return;

        const rewardGem = completedAchievement.reward_gem;
        const rewardTitle = completedAchievement.reward_title;

        // 사용자 업적 테이블에 데이터 저장
        await insertUserAchievement(userId, completedAchievement.id);

        // Gem 보상 처리
        if (rewardGem) {
          const userGem = await getUserGem(userId);
          const newUserGem = (userGem ?? 0) + rewardGem;

          // Gem 데이터 업데이트
          if (userGem) {
            await updateUserGem(userId, newUserGem);
            useUserStore.setState({ gem: newUserGem });
          }
        }

        // 타이틀 보상 처리
        if (rewardTitle) {
          await insertUserTitle(userId, rewardTitle);
        }

        // 상태를 최신 상태 기반으로 업데이트
        setAchievements((prevAchievements) =>
          prevAchievements.map((achievement) => {
            if (achievement.id === id && achievement.isMax) {
              return {
                ...achievement,
                level: achievement.level,
                current: 0, // 값 초기화
                isMax: false,
              };
            }
            return achievement;
          })
        );

        console.log('보상 및 완료 챌린지 정보', {
          achievement: completedAchievement,
          rewardGem: rewardGem,
          rewardTitle: rewardTitle,
        });

        if (!rewardGem && !rewardTitle) {
          await Swal.fire({
            icon: 'success',
            title: '레벨 상승 보상이 없습니다!',
          });
        } else {
          // 보상 지급 알림
          await Swal.fire({
            icon: 'success',
            title: '보상이 지급되었습니다!',
          });
        }
      } catch (error) {
        console.error('Error inserting user achievement:', error);
      }
    },
    [userId] // userId가 변경될 때만 의존
  );

  return {
    achievements,
    setAchievements,
    handleReward,
  };
};

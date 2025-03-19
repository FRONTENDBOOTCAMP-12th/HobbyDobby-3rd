import {
  deleteUserAchievement,
  deleteUserTitle,
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

        // 테스트 시 같은 업적 무한 추가를 막기 위해 삭제
        await deleteUserAchievement(userId, completedAchievement.id);

        // 사용자 업적 테이블에 데이터 저장
        await insertUserAchievement(userId, completedAchievement.id);

        // Gem 보상 처리
        if (rewardGem) {
          const userGem = await getUserGem(userId);

          const newGem = (userGem ?? 0) + rewardGem;

          // Gem 지급 (우선 무한 지급을 막기 위해 2500이 아닐 경우 2500으로 초기화)
          if (userGem !== 2500) {
            await updateUserGem(userId, 2500);
            useUserStore.setState({ gem: 2500 });
          } else {
            await updateUserGem(userId, newGem);
            useUserStore.setState({ gem: newGem });
          }
        }

        // 타이틀 보상 처리
        if (rewardTitle) {
          // 테스트 시 같은 타이틀 무한 추가를 막기 위해 타이틀 삭제
          await deleteUserTitle(userId, rewardTitle);

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
                isMax: true, // 우선 테스트를 위해 true로 설정
                isRewarded: true,
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

        // 보상 지급 알림
        await Swal.fire({
          icon: 'success',
          title: '보상이 지급되었습니다!',
        });
      } catch (error) {
        console.error('Error inserting user achievement:', error);
      }
    },
    [userId] // userId가 변경될 때만 의존
  );

  /* 테스트용 보상 초기화 함수 */
  const handleResetReward = useCallback(
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

        // 테스트 시 같은 업적 무한 추가를 막기 위해 삭제
        await deleteUserAchievement(userId, completedAchievement.id);

        // Gem 보상 리셋
        if (rewardGem) {
          const userGem = await getUserGem(userId);

          const newGem = (userGem ?? 0) - rewardGem;

          await updateUserGem(userId, newGem);
          useUserStore.setState({ gem: newGem });
        }

        // 타이틀 보상 처리
        if (rewardTitle) {
          // 테스트 시 같은 타이틀 무한 추가를 막기 위해 타이틀 삭제
          await deleteUserTitle(userId, rewardTitle);
        }

        // 상태를 최신 상태 기반으로 업데이트
        setAchievements((prevAchievements) =>
          prevAchievements.map((achievement) => {
            if (achievement.id === id && achievement.isMax) {
              return {
                ...achievement,
                level: achievement.level,
                current: achievement.total, // 값 초기화
                isRewarded: false,
              };
            }
            return achievement;
          })
        );

        console.log('보상 및 완료 챌린지 정보 삭제', {
          achievement: completedAchievement,
          rewardGem: rewardGem,
          rewardTitle: rewardTitle,
        });

        // 보상 초기화 알림
        await Swal.fire({
          icon: 'success',
          title: '업적 완료 초기화',
        });
      } catch (error) {
        console.error('Error deleting user achievement:', error);
      }
    },
    [userId] // userId가 변경될 때만 의존
  );

  return {
    achievements,
    setAchievements,
    handleReward,
    handleResetReward,
  };
};

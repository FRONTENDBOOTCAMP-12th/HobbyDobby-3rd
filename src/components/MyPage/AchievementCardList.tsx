import { useEffect } from 'react';
import { useHandleReward } from '@/hooks/useHandleReward';
import { useUserStore } from '@/stores/user';
import {
  calculateAchievement,
  getAchievementDescription,
  getAchievementMaxValue,
  getAchievementName,
} from '@/utils/getAchievement';
import AchievementCard from './AchievementCard';
import { getAchievementByLevelType } from '@/lib/api';

const AchievementCardList = ({
  daysSinceJoin,
  completedChallenges,
  completedAchievements,
}: {
  daysSinceJoin: number;
  completedChallenges: number;
  completedAchievements: string[];
}) => {
  const { achievements, setAchievements, handleReward } = useHandleReward();
  const userExp = useUserStore((state) => state.exp) ?? 0;
  const userId = useUserStore((state) => state.uid) ?? null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (achievements?.length === 0 && completedChallenges > 0) {
          const values = {
            attendance_days: daysSinceJoin, // 연속 출석 업적은 현재 가입 후 지난 일수로 계산
            exp: userExp,
            completed_challenges: completedChallenges,
          };

          const fetchedAchievements = await Promise.all(
            Object.entries(values).map(async ([type, value], index) => {
              const { current, level } = calculateAchievement(type, value);
              const maxValue = getAchievementMaxValue(type);

              const nowCompletedAchievement = await getAchievementByLevelType(
                level,
                type as 'attendance_days' | 'exp' | 'completed_challenges'
              );

              const isOnList = nowCompletedAchievement
                ? completedAchievements.includes(nowCompletedAchievement.id)
                : false;

              return {
                id: `${index + 1}`,
                name: getAchievementName(type),
                description: getAchievementDescription(type),
                type,
                total: maxValue,
                current: isOnList && current === maxValue ? 0 : current,
                level,
                isMax:
                  !isOnList && current !== 0 ? current === maxValue : false,
                onReward: () => handleReward(`${index + 1}`, level, type),
              };
            })
          );

          setAchievements(fetchedAchievements);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // useCallback과 setState 함수는 무한루프 방지를 위해 제외
    userId,
    userExp,
    daysSinceJoin,
    achievements,
    completedChallenges,
  ]);
  return (
    <div className="achievement-card-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementCardList;

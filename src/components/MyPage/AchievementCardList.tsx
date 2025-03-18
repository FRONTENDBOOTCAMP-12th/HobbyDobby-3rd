import { useHandleReward } from '@/hooks/useHandleReward';
import { getUserCompletedChallenge } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import {
  calculateAchievement,
  getAchievementDescription,
  getAchievementMaxValue,
  getAchievementName,
} from '@/utils/getAchievement';
import { useEffect } from 'react';
import AchievementCard from './AchievementCard';

const AchievementCardList = ({ daysSinceJoin }: { daysSinceJoin: number }) => {
  const { achievements, setAchievements, handleReward, handleResetReward } =
    useHandleReward();
  const userExp = useUserStore((state) => state.exp) ?? 0;
  const userId = useUserStore((state) => state.uid) ?? null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCompletedChallenge(userId);

        const completedChallenges = data?.length ?? 0;

        if (achievements?.length === 0) {
          const values = {
            attendance_days: daysSinceJoin,
            exp: userExp,
            completed_challenges: completedChallenges,
          };

          const fetchedAchievements = Object.entries(values).map(
            ([type, value], index) => {
              const { current, level } = calculateAchievement(type, value);
              const maxValue = getAchievementMaxValue(type);

              return {
                id: `${index + 1}`,
                name: getAchievementName(type),
                description: getAchievementDescription(type),
                type,
                total: getAchievementMaxValue(type),
                current,
                level,
                isMax: current === maxValue,
                isRewarded: false,
                onReward: () => handleReward(`${index + 1}`, level, type),
                resetReward: () =>
                  handleResetReward(`${index + 1}`, level, type),
              };
            }
          );

          setAchievements(fetchedAchievements);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    void fetchData();
  }, [userId, userExp, daysSinceJoin, achievements.length]);
  return (
    <>
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </>
  );
};

export default AchievementCardList;

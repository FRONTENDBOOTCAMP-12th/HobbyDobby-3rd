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
import { useUserAchievementStore } from '@/stores/user-achievement'; // Zustand store import

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
  const storedAchievements = useUserAchievementStore(
    (state) => state.achievements
  ); // Zustand로 저장된 achievements 불러오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 업적 데이터가 이미 있다면 fetchData 호출하지 않음
        if (storedAchievements?.length > 0) return;

        if (completedChallenges > 0) {
          const values = {
            attendance_days: daysSinceJoin,
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

          // 상태에 업적 정보 저장
          setAchievements(fetchedAchievements);
          useUserAchievementStore.setState({
            achievements: fetchedAchievements,
          });
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    if (storedAchievements.length === 0 && completedChallenges > 0) {
      void fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storedAchievements,
    completedChallenges,
    completedAchievements,
    daysSinceJoin,
    userExp,
    handleReward,
  ]);

  // console.log(achievements);

  return (
    <div className="achievement-card-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementCardList;

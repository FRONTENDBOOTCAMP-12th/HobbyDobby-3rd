import { useEffect } from 'react';
import { useHandleReward } from '@/hooks/useHandleReward';
import { getUserCompletedChallenge } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import {
  calculateAchievement,
  getAchievementDescription,
  getAchievementMaxValue,
  getAchievementName,
} from '@/utils/getAchievement';
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
            attendance_days: daysSinceJoin, // 연속 출석 업적은 현재 가입 후 지난 일수로 계산
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
                total: maxValue,
                current,
                level,
                isMax: current === maxValue,
                isRewarded: false,
                onReward: () => handleReward(`${index + 1}`, level, type),
                resetReward: () =>
                  // 테스트용 업적/보상 초기화 함수
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // useCallback과 setState 함수는 무한루프 방지를 위해 제외
    userId,
    userExp,
    daysSinceJoin,
    achievements,
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

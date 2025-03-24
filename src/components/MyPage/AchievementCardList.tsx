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
        // ✅ 상태 초기화 추가
        useUserAchievementStore.setState({
          achievements: [],
          completedAchievements: [],
        });

        const values = {
          attendance_days: daysSinceJoin ?? 0,
          exp: userExp ?? 0,
          completed_challenges: completedChallenges ?? 0,
        };

        const fetchedAchievements = await Promise.all(
          Object.entries(values).map(async ([type, value], index) => {
            let current = 0;
            let level = 1;

            if (value > 0) {
              const result = calculateAchievement(type, value);
              current = result.current;
              level = result.level;
            }

            const maxValue = getAchievementMaxValue(type);

            const nowCompletedAchievement = await getAchievementByLevelType(
              level,
              type as 'attendance_days' | 'exp' | 'completed_challenges'
            );

            // 완료된 업적 여부 확인 (보상받은 업적 목록에 포함된 ID로 체크)
            const isCompleted = nowCompletedAchievement
              ? completedAchievements.includes(nowCompletedAchievement.id)
              : false;

            // `current === maxValue`라면 업적 완료된 상태로 설정하고, 완료된 업적이라면 보상 받기 버튼 비활성화
            const isMax = current === maxValue && !isCompleted;

            return {
              id: `${index + 1}`,
              name: getAchievementName(type),
              description: getAchievementDescription(type),
              type,
              total: maxValue,
              current: isCompleted && current === maxValue ? 0 : current,
              level,
              isMax: isMax, // 수정된 부분: `isMax` 체크
              onReward: () => handleReward(`${index + 1}`, level, type),
            };
          })
        );

        // ✅ 상태 갱신
        setAchievements(fetchedAchievements);
        useUserAchievementStore.setState({
          achievements: fetchedAchievements,
          completedAchievements,
        });
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    // 상태에 값이 없을 때만 fetchData 호출
    if (storedAchievements.length === 0) {
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

  return (
    <div className="achievement-card-list">
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementCardList;

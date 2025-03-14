import { useEffect, useState } from 'react';
import AchievementCard from './AchievementCard';
import {
  calculateAchievement,
  getAchievementDescription,
  getAchievementMaxValue,
  getAchievementName,
} from '@/utils/getAchievement';
import { AchievementCardProps } from '@/types/my-page/achievement';
import { useUserStore } from '@/stores/user';
import { getUserCompletedChallenge } from '@/lib/api';
const AchievementCardList = ({ daysSinceJoin }: { daysSinceJoin: number }) => {
  const [achievements, setAchievements] = useState<AchievementCardProps[]>([]);
  const userExp = useUserStore((state) => state.exp);
  const userId = useUserStore((state) => state.uid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCompletedChallenge(userId);

        const completedChallenges = data?.length ?? 0;
        if (achievements.length === 0) {
          const fetchedAchievements = [
            {
              id: '1',
              name: getAchievementName('attendance_days'),
              description: getAchievementDescription('attendance_days'),
              type: 'attendance_days',
              total: getAchievementMaxValue('attendance_days'),
              current: calculateAchievement('attendance_days', daysSinceJoin)
                .current,
              level: 1,
              // onLevelUp: handleLevelUp,
            },
            {
              id: '2',
              name: getAchievementName('exp'),
              description: getAchievementDescription('exp'),
              type: 'exp',
              total: getAchievementMaxValue('exp'),
              current: calculateAchievement('exp', userExp ?? 0).current,
              level: 2,
              // onLevelUp: handleLevelUp,
            },
            {
              id: '3',
              name: getAchievementName('completed_challenges'),
              description: getAchievementDescription('completed_challenges'),
              type: 'completed_challenges',
              total: getAchievementMaxValue('completed_challenges'),
              current: calculateAchievement(
                'completed_challenges',
                completedChallenges ?? 0
              ).current,
              level: 3,
              // onLevelUp: handleLevelUp,
            },
          ];

          setAchievements(fetchedAchievements);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    void fetchData();
  }, [userId, userExp, daysSinceJoin, achievements.length]);

  // const handleLevelUp = (id: string) => {
  //   const newAchievements = achievements.map((achievement) => {
  //     if (achievement.id === id) {
  //       const current = achievement.current + 1;
  //       const level = Math.floor(current / 7 + 1);
  //       return {
  //         ...achievement,
  //         current,
  //         level,
  //       };
  //     }
  //     return achievement;
  //   });
  //   setAchievements(newAchievements);
  // };

  console.log('achievements', achievements);
  return (
    <>
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          id={achievement.id}
          type={achievement.type}
          name={achievement.name}
          description={achievement.description}
          current={achievement.current}
          total={achievement.total}
          level={achievement.level}
          // onLevelUp={handleLevelUp}
        />
      ))}
    </>
  );
};

export default AchievementCardList;

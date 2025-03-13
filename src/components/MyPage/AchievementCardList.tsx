import { useEffect, useState } from 'react';
import { achievementsData } from '@/data/my-page/achievementsData';
import { AchievementCardProps } from '@/types/my-page/achievement';
import { calculateAchievement } from '@/utils/getMyPageValues';
import AchievementCard from './AchievementCard';

function AchievementCardList({ daysSinceJoin }: { daysSinceJoin: number }) {
  const [achievements, setAchievements] =
    useState<AchievementCardProps[]>(achievementsData);

  useEffect(() => {
    setAchievements((prevAchievements) => {
      return prevAchievements.map((achievement) => {
        const { level, current } = calculateAchievement(
          achievement.id,
          daysSinceJoin
        );

        return {
          ...achievement,
          level,
          current,
        };
      });
    });
  }, [daysSinceJoin]);

  return (
    <>
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          id={achievement.id}
          level={achievement.level}
          name={achievement.name}
          total={achievement.total}
          current={achievement.current}
          description={achievement.description}
        />
      ))}
    </>
  );
}

export default AchievementCardList;

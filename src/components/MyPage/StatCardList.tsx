import { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { getUserCompletedChallenge, getUserRank } from '@/lib/api';
import { useUserStore } from '@/stores/user';
import { StatCardProps } from '@/types/my-page/stat';

function StatCardList({ daysSinceJoin }: { daysSinceJoin: number }) {
  const { uid: userId, exp: userExp } = useUserStore();
  const [stats, setStats] = useState<StatCardProps[]>([
    { id: 1, name: '함께한 일수', value: daysSinceJoin },
    { id: 2, name: '완주 챌린지', value: 0 },
    { id: 3, name: '현재 등수', value: 0 },
    { id: 4, name: '총 경험치', value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [completedChallenges, rankData] = await Promise.all([
          getUserCompletedChallenge(userId),
          getUserRank(),
        ]);

        const valueDataMap = {
          // 함께한 일수
          1: daysSinceJoin,
          // 완주 챌린지
          2: completedChallenges?.length ?? 0,
          // 현재 등수
          3:
            (rankData?.findIndex((user) => user.uid === userId) ?? -1) + 1 ||
            null,
          // 총 경험치
          4: userExp ?? 0,
        };

        setStats((prevStats) => {
          // 값 변경 여부 확인
          const newStats = prevStats.map((stat) => ({
            ...stat,
            value:
              valueDataMap[stat.id as keyof typeof valueDataMap] ?? stat.value,
          }));

          // 상태 업데이트는 값이 변경될 때만
          return newStats.some(
            (stat, index) => stat.value !== prevStats[index].value
          )
            ? newStats
            : prevStats;
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    void fetchData();
  }, [userId, userExp, daysSinceJoin]);

  return (
    <>
      {stats.map((statCard) => (
        <StatCard
          key={statCard.id}
          id={statCard.id}
          name={statCard.name}
          value={statCard.value}
        />
      ))}
    </>
  );
}

export default StatCardList;

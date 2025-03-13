import CompletedChallengeCard from '@/components/LeaderBoard/CompletedChallengeCard';
import LeaderBoardTab from '@/components/LeaderBoard/Tab';
import './style.css';
import Title from '@/layouts/title';
import { useUserStore } from '@/stores/user';
import { useEffect, useState } from 'react';
import { getUserCompletedChallenge } from '@/lib/api';

interface ChallengesProps {
  challenge: {
    name: string;
    created_date: string | null;
    completed_date: string | null;
  } | null;
}

function LeaderBoardCompletedPage() {
  const userId = useUserStore((state) => state.uid);
  const [challenges, setChallenges] = useState<ChallengesProps[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCompletedChallenge(userId);

        setChallenges(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().catch((error) => {
      console.log('Error fetching subhobbies:', error);
    });
  }, [userId]);

  return (
    <div className="leader-board-completed">
      <Title>리더보드</Title>
      <LeaderBoardTab />
      <ul className="leader-board-completed__list">
        {challenges?.map((data) => (
          <CompletedChallengeCard
            key={data.challenge?.name}
            name={data.challenge?.name}
            createdDate={data.challenge?.created_date}
            completedDate={data.challenge?.completed_date}
          />
        ))}
      </ul>
    </div>
  );
}

export default LeaderBoardCompletedPage;

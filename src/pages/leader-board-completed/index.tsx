import CompletedChallengeCard from '@/components/LeaderBoard/CompletedChallengeCard';
import LeaderBoardTab from '@/components/LeaderBoard/Tab';
import './style.css';
import Title from '@/layouts/title';
import { useUserStore } from '@/stores/user';
import { getUserCompletedChallenge } from '@/lib/api';
import useFetchData from '@/hooks/useFetchData';

function LeaderBoardCompletedPage() {
  const userId = useUserStore((state) => state.uid);

  const { data: challenges } = useFetchData(
    () => getUserCompletedChallenge(userId),
    userId
  );

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

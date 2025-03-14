import LeaderBoardTab from '@/components/LeaderBoard/Tab';
import Title from '@/layouts/title';
import './style.css';
import LeaderBoardRankCard from '@/components/LeaderBoard/RankCard';
import { getUserRank } from '@/lib/api';
import useFetchData from '@/hooks/useFetchData';

function LeaderBoardRankingPage() {
  const { data: rank } = useFetchData(getUserRank);

  return (
    <>
      <Title>랭킹</Title>
      <LeaderBoardTab />
      <p className="leader-board-ranking__desc">취미 랭킹</p>
      <ul className="leader-board-ranking__list">
        {rank?.map((data, index) => (
          <LeaderBoardRankCard
            key={data.uid}
            rank={index + 1}
            profileImg={data.image}
            nickname={data.nickname}
            title={data.title}
            exp={data.exp}
          />
        ))}
      </ul>
    </>
  );
}

export default LeaderBoardRankingPage;

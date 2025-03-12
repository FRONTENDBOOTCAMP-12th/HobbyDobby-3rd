import LeaderBoardTab from '@/components/LeaderBoard/Tab';
import Title from '@/layouts/title';
import './style.css';
import LeaderBoardRankCard from '@/components/LeaderBoard/RankCard';
import { useEffect, useState } from 'react';
import { getUserRank } from '@/lib/api';

interface RankProps {
  uid: string;
  nickname: string;
  image: string | null;
  title: string | null;
  exp: number | null;
}

function LeaderBoardRankingPage() {
  const [rank, setRank] = useState<RankProps[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserRank();
        setRank(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData().catch((error) => {
      console.log('Error fetching rank:', error);
    });
  }, []);

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

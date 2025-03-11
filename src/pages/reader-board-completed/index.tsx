import CompletedChallengeCard from '@/components/ReaderBoard/CompletedChallengeCard';
import ReaderBoardTab from '@/components/ReaderBoard/Tab';
import './style.css';
import Title from '@/layouts/title';
// import { useUserStore } from '@/stores/user';
// import { useEffect } from 'react';
// import { supabase } from '@/lib/supabase-client';

const exampleData = [
  {
    id: 1,
    name: '챌린지1',
    created_date: '2025-01-15T12:30:00+09:00',
    completed_date: '2025-03-07T15:45:00+09:00',
  },
  {
    id: 2,
    name: '챌린지2',
    created_date: '2025-02-01T09:00:00+09:00',
    completed_date: '2025-03-08T18:20:00+09:00',
  },
  {
    id: 3,
    name: '챌린지3',
    created_date: '2025-01-20T14:10:00+09:00',
    completed_date: '2025-03-10T10:00:00+09:00',
  },
];

function ReaderBoardCompletedPage() {
  // const userId = useUserStore((state) => state.id);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (userId) {
  //       try {
  //         const { data: challengeId } = await supabase
  //           .from('user_completed_challenges')
  //           .select('challenge_id')
  //           .eq('user_id', userId);

  //         if (challengeId && challengeId.length > 0) {
  //           const { data } = await supabase
  //             .from('challenge')
  //             .select('name,created_date,completed_date')
  //             .in('id', challengeId);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       throw new Error('완주한 챌린지를 찾을 수 없습니다..');
  //     }
  //   };
  // }, []);

  return (
    <div className="reader-board-completed">
      <Title>리더보드</Title>
      <ReaderBoardTab />
      <ul className="reader-board-completed__list">
        {exampleData.map((data) => (
          <CompletedChallengeCard
            key={data.id}
            id={data.id}
            name={data.name}
            createdDate={data.created_date}
            completedDate={data.completed_date}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReaderBoardCompletedPage;

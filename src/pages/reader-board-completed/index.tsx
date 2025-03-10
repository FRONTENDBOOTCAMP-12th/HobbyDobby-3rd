import CompletedChallengeCard from '@/components/ReaderBoard/CompletedChallengeCard';
import ReaderBoardTab from '@/components/ReaderBoard/Tab';
import './style.css';

const exampleData = [
  {
    id: 1,
    name: '챌린지1',
    date: '2025-03-07',
    period: 200,
  },
  {
    id: 2,
    name: '챌린지2',
    date: '2025-03-05',
    period: 173,
  },
  {
    id: 3,
    name: '챌린지3',
    date: '2025-03-08',
    period: 365,
  },
];

function ReaderBoardCompletedPage() {
  return (
    <>
      <ReaderBoardTab />
      <ul className="reader-board-completed-container">
        {exampleData.map((data) => (
          <CompletedChallengeCard
            key={data.id}
            name={data.name}
            date={data.date}
            period={data.period}
          />
        ))}
      </ul>
    </>
  );
}

export default ReaderBoardCompletedPage;

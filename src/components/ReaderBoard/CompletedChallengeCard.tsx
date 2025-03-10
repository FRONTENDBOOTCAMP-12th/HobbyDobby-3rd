import './completed-challenge-card.css';

interface CompletedChallengeProps {
  name: string;
  date: string;
  period: number;
}

function CompletedChallengeCard({
  name,
  date,
  period,
}: CompletedChallengeProps) {
  const dateArr = date.split('-');

  return (
    <li className="completed-challenge">
      <h3 className="completed-challenge__name">{name}</h3>
      <p className="completed-challenge__date">
        완주 {dateArr[0]}년 {dateArr[1]}월 {dateArr[2]}일
      </p>
      <p className="completed-challenge__period">기간 {period}일</p>
    </li>
  );
}

export default CompletedChallengeCard;

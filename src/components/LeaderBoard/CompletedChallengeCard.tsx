import { Link } from 'react-router';
import './completed-challenge-card.css';

interface CompletedChallengeProps {
  name: string | undefined;
  createdDate: string | null | undefined;
  completedDate: string | null | undefined;
}

function CompletedChallengeCard({
  name,
  createdDate,
  completedDate,
}: CompletedChallengeProps) {
  // 챌린지 완주 날짜 구하기
  const date = new Date(completedDate!);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 챌린지 활동 기간 구하기
  const start = new Date(createdDate!).getTime();
  const end = new Date(completedDate!).getTime();
  const difference = end - start;
  const period = Math.floor(difference / (1000 * 60 * 60 * 24));

  return (
    <li className="completed-challenge-card">
      <Link
        to={{
          pathname: `/leader-board/detail/${name}`,
          search: `?date=${year}-${month}-${day}&period=${period}`,
        }}
        className="completed-challenge-card__link"
      >
        <h3 className="completed-challenge-card__name">{name}</h3>
        <p className="completed-challenge-card__date">
          완주 {year}년 {month}월 {day}일
        </p>
        <p className="completed-challenge__period">기간 {period}일</p>
      </Link>
    </li>
  );
}

export default CompletedChallengeCard;

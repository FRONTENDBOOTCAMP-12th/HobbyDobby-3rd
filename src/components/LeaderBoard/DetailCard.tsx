import './detail-card.css';
import { Link } from 'react-router';
import LeftArrow from '/assets/left-arrow.svg';

interface LeaderBoardDetailCardProps {
  challengeName: string | undefined;
  dateArr: string[] | undefined;
  period: string | null;
}

function DetailCard({
  challengeName,
  dateArr,
  period,
}: LeaderBoardDetailCardProps) {
  return (
    <div className="leader-board-detail-card">
      <Link
        to="/leader-board"
        className="leader-board-detail-card__link"
        aria-label="뒤로 가기"
      >
        <img src={LeftArrow} alt="뒤로 가기" aria-hidden="true" />
      </Link>
      <div className="leader-board-detail-card__container">
        <h3>{challengeName}</h3>
        <p>
          완주 {dateArr?.[0]}년 {dateArr?.[1]}월 {dateArr?.[2]}일
        </p>
        <p>기간 {period}일</p>
      </div>
    </div>
  );
}

export default DetailCard;

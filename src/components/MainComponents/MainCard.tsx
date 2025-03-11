import { Link } from 'react-router';
import './main-card.css';

interface MainCardProps {
  subHobby?: string;
  challengeName?: string;
  section?: number;
  onChallenge?: boolean;
}

function MainCard({
  challengeName,
  section,
  onChallenge = true,
  subHobby,
}: MainCardProps) {
  return onChallenge ? (
    <section className="main-card">
      <h3>{challengeName}</h3>
      <h4>섹션 {section}</h4>
    </section>
  ) : (
    <section className="main-card">
      <p>챌린지를 생성해주세요.🥰</p>
      <Link to={`/select-hobby/${subHobby}`}>새 챌린지 생성</Link>
    </section>
  );
}

export default MainCard;

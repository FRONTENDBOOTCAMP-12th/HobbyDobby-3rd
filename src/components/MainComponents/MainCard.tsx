import { Link } from 'react-router';
import './main-card.css';

interface MainCardProps {
  hobby: string;
  challengeName: string | null;
  section: number | null;
}

function MainCard({ challengeName, section, hobby }: MainCardProps) {
  return challengeName ? (
    <section className="main-card">
      <h3>{challengeName}</h3>
      <h4>섹션 {section}</h4>
    </section>
  ) : (
    <section className="main-card">
      <p>챌린지를 생성해주세요.🥰</p>
      <Link className="main-card__link" to={`/select-hobby/${hobby}`}>
        새 챌린지 생성
      </Link>
    </section>
  );
}

export default MainCard;

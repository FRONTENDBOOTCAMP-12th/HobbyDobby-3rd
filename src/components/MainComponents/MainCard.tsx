import { useNavigate } from 'react-router';
import './main-card.css';

interface MainCardProps {
  hobby: string;
  challengeName: string | null;
  section: number | null;
}

function MainCard({ challengeName, section, hobby }: MainCardProps) {
  const navigate = useNavigate();

  const handleSelectHobby = () => {
    void navigate(`/select-hobby/${hobby}`, {
      state: {
        hobbyName: hobby,
      },
    });
  };

  return challengeName ? (
    <section className="main-card">
      <h3>{challengeName}</h3>
      <h4>섹션 {section}</h4>
    </section>
  ) : (
    <div className="main-card">
      <p>챌린지를 생성해주세요.🥰</p>
      <button className="main-card__link-button" onClick={handleSelectHobby}>
        새 챌린지 생성
      </button>
    </div>
  );
}

export default MainCard;

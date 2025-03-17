import { useNavigate } from 'react-router';
import './hobby-select.css';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbySelectCardProps {
  name: string;
}

function HobbySelectCard({ name }: HobbySelectCardProps) {
  const navigate = useNavigate();

  const handleSelectHobby = (name: string) => {
    void navigate(`/select-hobby/${name}`, {
      state: {
        hobbyName: name,
      },
    });
  };

  return (
    <li className="hobby-select-card">
      <button
        type="button"
        className="hobby-select-card__button"
        onClick={() => handleSelectHobby(name)}
      >
        <img src={getHobbyIcon(name)} alt={name} />
        <p className="hobby-select-card__desc">{name}</p>
      </button>
    </li>
  );
}

export default HobbySelectCard;

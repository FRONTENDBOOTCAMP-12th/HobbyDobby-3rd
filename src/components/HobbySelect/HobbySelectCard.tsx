import { useNavigate } from 'react-router';
import './hobby-select.css';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbySelectCardProps {
  id: string;
  name: string;
}

function HobbySelectCard({ id, name }: HobbySelectCardProps) {
  const navigate = useNavigate();

  const handleSelectHobby = (id: string) => {
    void navigate(`/select-hobby/${name}`, {
      state: {
        hobbyId: id,
      },
    });
  };

  return (
    <li className="hobby-select-card">
      <button
        type="button"
        className="hobby-select-card__button"
        onClick={() => handleSelectHobby(id)}
      >
        <img src={getHobbyIcon(name)} alt={name} />
        <p className="hobby-select-card__desc">{name}</p>
      </button>
    </li>
  );
}

export default HobbySelectCard;

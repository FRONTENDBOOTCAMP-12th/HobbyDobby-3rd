import './hobby-select.css';
import { Link } from 'react-router';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbySelectCardProps {
  id: number;
  name: string;
}

function HobbySelectCard({ id, name }: HobbySelectCardProps) {
  return (
    <li className="hobby-select-card">
      <Link to={`/select-sub_hobby/:${id}`} className="hobby-select-card__link">
        <img src={getHobbyIcon(id)} alt={name} />
        <p className="hobby-select-card__desc">{name}</p>
      </Link>
    </li>
  );
}

export default HobbySelectCard;

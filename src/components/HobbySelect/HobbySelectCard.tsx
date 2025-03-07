import './hobby-select.css';
import { Link } from 'react-router';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbySelectCardProps {
  name: string;
}

function HobbySelectCard({ name }: HobbySelectCardProps) {
  return (
    <li className="hobby-select-card">
      <Link
        to={`/select-sub_hobby/:${name}`}
        className="hobby-select-card__link"
      >
        <img src={getHobbyIcon(name)} alt={name} />
        <p className="hobby-select-card__desc">{name}</p>
      </Link>
    </li>
  );
}

export default HobbySelectCard;

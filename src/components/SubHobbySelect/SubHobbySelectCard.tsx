import './subhobby-select.css';
import { getSubHobbyIcon } from '@/utils/getSubHobbyIcon';

interface SubHobbySelectCardProps {
  name: string;
  info: string;
}

function SubHobbySelectCard({ name, info }: SubHobbySelectCardProps) {
  return (
    <div className="subhobby-select-card">
      <figure className="subhobby-select-card__figure">
        <img src={getSubHobbyIcon(name)} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <div className="subhobby-select-card__container">
        <p className="subhobby-select-card__desc">{info}</p>
        <button type="button" className="subhobby-select-card__button">
          선택
        </button>
      </div>
    </div>
  );
}

export default SubHobbySelectCard;

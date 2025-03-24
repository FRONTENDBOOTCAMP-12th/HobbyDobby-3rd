import { useNavigate } from 'react-router';
import './hobby-select.css';
import { getHobbyIcon } from '@/utils/getHobbyIcon';
import Swal from 'sweetalert2';

interface HobbySelectCardProps {
  name: string;
}

function HobbySelectCard({ name }: HobbySelectCardProps) {
  const navigate = useNavigate();

  const handleSelectHobby = async (name: string) => {
    if (name === '독서') {
      void navigate(`/select-hobby/${name}`, {
        state: {
          hobbyName: name,
        },
      });
    } else {
      await Swal.fire({ icon: 'info', text: '개발 진행 중인 섹션입니다.' });
    }
  };

  return (
    <li className="hobby-select-card">
      <button
        type="button"
        className="hobby-select-card__button"
        onClick={() => void handleSelectHobby(name)}
      >
        <img src={getHobbyIcon(name)} alt="" />
        <p className="hobby-select-card__desc">{name}</p>
      </button>
    </li>
  );
}

export default HobbySelectCard;

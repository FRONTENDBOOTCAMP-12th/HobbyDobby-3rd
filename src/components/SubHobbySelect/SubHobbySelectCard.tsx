import { useNavigate } from 'react-router';
import './subhobby-select.css';
import { getSubHobbyIcon } from '@/utils/getSubHobbyIcon';
import Swal from 'sweetalert2';

interface SubHobbySelectCardProps {
  hobby: string;
  name: string;
  info: string;
}

function SubHobbySelectCard({ hobby, name, info }: SubHobbySelectCardProps) {
  const navigate = useNavigate();

  const handleSubHobbySelect = (hobby: string, subHobby: string) => {
    void Swal.fire({
      title: '선택하시겠습니까?',
      confirmButtonText: '선택',
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonColor: `var(--primary-color)`,
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        void navigate('/challenge-start', {
          state: {
            hobby,
            subHobby,
          },
        });
      }
    });
  };

  return (
    <div className="subhobby-select-card">
      <figure className="subhobby-select-card__figure">
        <img src={getSubHobbyIcon(name)} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <div className="subhobby-select-card__container">
        <p className="subhobby-select-card__desc">{info}</p>
        <button
          type="button"
          className="subhobby-select-card__button"
          onClick={() => handleSubHobbySelect(hobby, name)}
        >
          선택
        </button>
      </div>
    </div>
  );
}

export default SubHobbySelectCard;

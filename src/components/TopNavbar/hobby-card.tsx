import { useUserStore } from '@/stores/user';
import PlusIcon from '/assets/plus.svg';
import { UserData } from '@/lib/supabase-client';
import { updateUserNowHobby as updateDBUserNowHobby } from '@/lib/api';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbyCardProps {
  activeHobby: string | null;
}

function HobbyCard({ activeHobby }: HobbyCardProps) {
  const uid = useUserStore((state) => state.uid);
  const hobbies = useUserStore((state) => state.user_hobbies);
  const updateStoreNowHobby = useUserStore((state) => state.updateNowHobby);

  const updateHobby = (uid: UserData['uid'], hobby: string | null) => {
    if (hobby) {
      updateDBUserNowHobby(uid, hobby)
        .then(() => {
          updateStoreNowHobby(hobby);
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return (
    <div className="hobby-card">
      <ul className="hobby-card__list">
        {hobbies?.map((hobby, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => updateHobby(uid, hobby)}
              className={hobby === activeHobby ? 'activeHobby' : ''}
            >
              <img src={getHobbyIcon(hobby)} alt={hobby!} />
              <p>{hobby}</p>
            </button>
          </li>
        ))}

        <li>
          <a href="/select-hobby" className="hobby-card__link">
            <img src={PlusIcon} alt="추가" />
            <p>취미 추가</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HobbyCard;

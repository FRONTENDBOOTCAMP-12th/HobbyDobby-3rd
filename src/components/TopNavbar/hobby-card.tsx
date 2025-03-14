import { useUserStore } from '@/stores/user';
import PlusIcon from '/assets/plus.svg';
import { HobbyData, UserData } from '@/lib/supabase-client';
import { updateUserNowHobby as updateDBUserNowHobby } from '@/lib/api';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

interface HobbyCardProps {
  activeHobby: string | undefined;
}

function HobbyCard({ activeHobby }: HobbyCardProps) {
  const uid = useUserStore((state) => state.uid);
  const hobbies = useUserStore((state) => state.user_hobbies);
  const updateStoreNowHobby = useUserStore((state) => state.updateNowHobby);

  const updateHobby = (uid: UserData['uid'], hobby: HobbyData | null) => {
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
              className={hobby?.name === activeHobby ? 'activeHobby' : ''}
            >
              <img src={getHobbyIcon(hobby?.name)} alt={hobby?.name} />
              <p>{hobby?.name}</p>
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

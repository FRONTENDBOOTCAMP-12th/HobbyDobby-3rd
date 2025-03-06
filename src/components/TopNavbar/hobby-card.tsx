// import { useEffect, useState } from 'react';
import PlusIcon from '/assets/plus.svg';
// import { supabase } from '@/lib/supabase-client';
// import { getHobbyIcon } from './index';
// import { useHobbyStore } from '@/stores/hobby';

// interface HobbyCardProps {
//   activeHobby: number | null;
// }

// interface HobbiesProps {
//   hobbyId: number;
//   hobbyName: string;
// }

function HobbyCard() {
// { activeHobby }: HobbyCardProps
  // const [hobbies, setHobbies] = useState<HobbiesProps[] | null>(null);
  // const updateHobby = useHobbyStore((state) => state.updateHobby);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: userHobbies } = await supabase
  //         .from('user_hobbies')
  //         .select('*')
  //         .eq('user_id', userId);
  //       const hobbyIds = userHobbies?.map((item) => item.hobby_id) ?? [];
  //       const { data } = await supabase
  //         .from('hobby')
  //         .select('*')
  //         .in('id', hobbyIds);
  //       setHobbies(
  //         data?.map((item) => ({
  //           hobbyId: item.id,
  //           hobbyName: item.name,
  //         }))
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="hobby-card">
      <ul className="hobby-card__list">
        {/* {hobbies?.map((hobby, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => updateHobby(hobby.hobbyId)}
              className={hobby.hobbyId === activeHobby ? 'activeHobby' : ''}
            >
              <img src={getHobbyIcon(hobby.hobbyId)} alt={hobby.hobbyName} />
              <p>{hobby.hobbyName}/</p>
            </button>
          </li>
        ))} */}

        <li>
          <a href="/hobby" className="hobby-card__link">
            <img src={PlusIcon} alt="추가" />
            <p>취미 추가</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HobbyCard;

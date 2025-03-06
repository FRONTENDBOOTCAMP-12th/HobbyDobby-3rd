import './top-navbar.css';
import {
  // useEffect,
  useState,
} from 'react';
// import { supabase } from '@/lib/supabase-client';
import Logo from '/assets/large-logo.svg';
import GemIcon from '/assets/gem.svg';
// import HobbyCard from './hobby-card';
import { useHobbyStore } from '@/stores/hobby';
import { useGemStore } from '@/stores/gem';

// hobby_id에 따른 hobbyIcon을 리턴하는 함수
export const getHobbyIcon = (id: number | null): string | undefined => {
  switch (id) {
    case 1:
      return '/assets/book.svg';
    case 2:
      return '/assets/exercise-running.svg';
    default:
      return;
  }
};

function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const nowHobby = useHobbyStore((state) => state.nowHobby);
  // const setNowHobby = useHobbyStore((state) => state.updateHobby);
  const gem = useGemStore((state) => state.gem);
  // const updateGem = useGemStore((state) => state.updateGem);

  const handleButton = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await supabase.from('user').select('*').eq('user_id',userId);
  //       setNowHobby(data?.now_hobby);
  //       updateGem(data?.gem)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="top-navbar">
        <img src={Logo} alt="Hobby Dobby" />
        <div className="top-navbar__container">
          <div className="top-navbar__cash">
            <img src={GemIcon} alt="보유 캐시" />
            <span>{gem}</span>
          </div>
          <button
            type="button"
            className="top-navbar__button"
            onClick={handleButton}
          >
            {getHobbyIcon(nowHobby) && (
              <img src={getHobbyIcon(nowHobby)} alt="독서" />
            )}
          </button>
        </div>
      </div>
      {/* {isOpen ? <HobbyCard activeHobby={nowHobby} /> : ''} */}
    </>
  );
}

export default TopNavbar;

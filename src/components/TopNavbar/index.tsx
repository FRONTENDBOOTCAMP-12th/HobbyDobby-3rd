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
  const [gem] = useState(0);

  const handleButton = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await supabase
  //         .from('user')
  //         .select('*')
  //         .eq('user_id', userId);
  //       setNowHobby(data?.now_hobby);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <header className="top-navbar">
        <h1 className="top-navbar__logo">
          <span className="sr-only">Hobby Dobby</span>
          <img src={Logo} alt="Hobby Dobby" aria-hidden="true" />
        </h1>
        <div className="top-navbar__container">
          <div className="top-navbar__cash" aria-label="보유 캐시">
            <img src={GemIcon} alt="gem" aria-hidden="true" />
            <span>{gem}</span>
          </div>
          <button
            type="button"
            className="top-navbar__button"
            onClick={handleButton}
            aria-label="취미 변경"
          >
            {getHobbyIcon(nowHobby) && (
              <img src={getHobbyIcon(nowHobby)} alt="독서" />
            )}
          </button>
        </div>
      </header>
      {/* {isOpen ? <HobbyCard activeHobby={nowHobby} /> : ''} */}
    </>
  );
}

export default TopNavbar;

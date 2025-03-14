import './top-navbar.css';
import { useState } from 'react';
import Logo from '/assets/large-logo.svg';
import GemIcon from '/assets/gem.svg';
import HobbyCard from './hobby-card';
import { useUserStore } from '@/stores/user';
import { getHobbyIcon } from '@/utils/getHobbyIcon';

function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const nowHobby = useUserStore((state) => state.now_hobby?.name);
  const gem = useUserStore((state) => state.gem);

  const handleButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="top-navbar">
        <h1 className="top-navbar__logo">
          <span className="sr-only">Hobby Dobby</span>
          <img src={Logo} alt="" />
        </h1>
        <div className="top-navbar__container">
          <div
            className="top-navbar__cash"
            aria-label="보유 캐시"
            title="보유 캐시"
          >
            <img src={GemIcon} alt="" />
            <span>{gem?.toLocaleString()}</span>
          </div>
          <button
            type="button"
            className="top-navbar__button"
            onClick={handleButton}
            aria-label="취미 변경"
          >
            {getHobbyIcon(nowHobby) && (
              <img src={getHobbyIcon(nowHobby)} alt="" />
            )}
          </button>
        </div>
        {isOpen ? <HobbyCard activeHobby={nowHobby} /> : ''}
      </header>
    </>
  );
}

export default TopNavbar;

import './bottom-navbar.css';
import Navlink from './link';
import HomeIcon from '/assets/home.svg';
import leaderBoardIcon from '/assets/leader-board.svg';
import StoreIcon from '/assets/store.svg';
import MypageIcon from '/assets/mypage.svg';

function BottomNavbar() {
  return (
    <nav className="bottom-navbar" aria-label="하단 네비게이션바">
      <Navlink to="/home" image={HomeIcon} menu="홈" />
      <Navlink to="/leader-board" image={leaderBoardIcon} menu="리더보드" />
      <Navlink to="/store" image={StoreIcon} menu="스토어" />
      <Navlink to="/mypage" image={MypageIcon} menu="내정보" />
    </nav>
  );
}

export default BottomNavbar;

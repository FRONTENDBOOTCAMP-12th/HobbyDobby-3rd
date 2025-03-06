import './bottom-navbar.css';
import Navlink from './link';
import HomeIcon from '/assets/home.svg';
import ReaderBoardIcon from '/assets/reader-board.svg';
import StoreIcon from '/assets/store.svg';
import MypageIcon from '/assets/mypage.svg';

function BottomNavbar() {
  return (
    <nav className="bottom-navbar" aria-label="하단 네비게이션바">
      <Navlink to="/" image={HomeIcon} menu="홈" />
      <Navlink to="/reader-board" image={ReaderBoardIcon} menu="리더보드" />
      <Navlink to="/store" image={StoreIcon} menu="스토어" />
      <Navlink to="/mypage" image={MypageIcon} menu="내정보" />
    </nav>
  );
}

export default BottomNavbar;

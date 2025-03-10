import './tab.css';
import TabLink from './TabLink';

function ReaderBoardTab() {
  return (
    <ul className="reader-board-tab">
      <li>
        <TabLink to="/reader-board" name="완주 챌린지" />
      </li>
      <li>
        <TabLink to="/reader-board/rank" name="랭킹" />
      </li>
    </ul>
  );
}

export default ReaderBoardTab;

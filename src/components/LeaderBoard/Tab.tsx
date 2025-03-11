import './tab.css';
import TabLink from './TabLink';

function LeaderBoardTab() {
  return (
    <ul className="leader-board-tab">
      <li>
        <TabLink to="/leader-board" name="완주 챌린지" />
      </li>
      <li>
        <TabLink to="/leader-board/rank" name="랭킹" />
      </li>
    </ul>
  );
}

export default LeaderBoardTab;
